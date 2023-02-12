import {Router} from "express"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
import bcrypt from "bcrypt"
import User from "../models/user.js"
import login from "./middleware/auth.js"
import { v4 as uuidv4 } from 'uuid';

const router = Router()
router.get("/signin", async(req, res) => {
    try {
        const token = req.cookies[process.env.COOKIE_NAME]
        if(!token) {
            res.status(401).json('Invalid token')
            return;
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        const user = await User.findById(decoded.id)
        if(!user.confirmed){
            res.status(401).json("Account is not verefied")
        }
        res.status(200).json({username: user.username, profilePic: user.profilePic})
        return;
    } catch(error) {
        res.status(501).json('Something went wrong')
    }
})
router.post("/signup", async(req, res) => {
    try {
        const { email, username, password } = req.body ;
        if(!email || !username || !password) {
            res.status(501).json("Missing field!")
            return; 
        }
        if(username.length < 4 || password.length < 8) {
            res.status(403).json("Username must be atleast 4 charaters and password atleast 8")
            return;
        }
        const userWithUsername = await User.findOne({username})
        if(userWithUsername){
            res.status(401).json("Username already used!")
            return;
        }
        const user = await User.findOne({email})
        if(user){
            res.status(401).json("Email is already used")
            return;
        }
        const t = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const checkEmail = t.test(email)
        if(!checkEmail) {
            res.status(404).json("Invalid email")
            return;
        }
        const RANDOM = Math.floor(100000 + Math.random() * 900000)
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({email, username, password:hashedPassword, confirmationCode:RANDOM.toString(), date: new Date()});
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        })
        const options = {
            from: process.env.EMAIL,
            to: email,
            subject: "Account verification",
            text: `${RANDOM}`
        }
        await transporter.sendMail(options)
        await newUser.save()
        res.status(200).json({message: "Account created please check ur email for confirmation!", email: email})   
    } catch (error) {
        res.status(500).json("Something went wrong!");
        return;
    }
})

router.post("/verify/:email", async(req, res) => {
    try {
        const email = req.params.email;
        const {code} = req.body;
        if(!email || !code) {
            res.status(404).json("Invalid info")
            return;
        }
        const user = await User.findOne({email})
        if(user.confirmationCode !== code){
            res.status(401).json("Invalid Confirmation Code")
            return;
        }
        user.confirmed = true
        await user.save()
        res.status(200).json("Verification Succeded")
    } catch (error) {
        res.status(501).json("Something went wrong")
    }
    

})
router.post("/signin", async(req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            res.status(404).json("Missing information")
            return;
        }
        const user = await User.findOne({email})
        if(!user){
            res.status(404).json("Invalid Email")
            return;
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            res.status(401).json("Incorrect Password")
            return;
        }
        if(!user.confirmed){
            res.status(401).json("Please confirm your account first")
            return;
        }
        const token = await jwt.sign({id: user.id}, process.env.JWT_KEY)
        res.cookie(process.env.COOKIE_NAME, token, {httpOnly: true, maxAge:(60 * 100 * 60 * 60)}).json({username:user.username, profilePic: user.profilePic})
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})


router.post("/sendrecoverylink", async(req, res) => {
    try {
        const {email} = req.body
        if(!email) {
            res.status(404).json("Invalid email")
            return;
        }
        const user = await User.findOne({email})
        const RANDOM = uuidv4()
        const LINK = `${process.env.DOMAIN}/recover/${email}/${RANDOM}`
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        })
        const options = {
            from: process.env.EMAIL,
            to: email,
            subject: "Recover your account",
            html: `<a href="${LINK}">Recover your account</a>`
        }
        await transporter.sendMail(options)
        user.recoveryCode = RANDOM
        await user.save()
        res.status(200).json("Check your email for the link")
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})

router.post("/checklink", async(req, res) => {
    const {code, email} = req.body
    if(!code || !email) {
        res.status(404).json("Missing informations")
        return;
    }
    const user = await User.findOne({email})
    if(user.recoveryCode !== code){
        res.status(401).json("Invalid link")
        return;
    }
    res.status(200).json("Valid Link")
})


router.post("/changepassword", async(req, res) => {
    try {
        const {newPassword, email, recoveryCode} = req.body
        if(!newPassword || !email, !recoveryCode) {
            res.status(404).json("Missing informations")
            return;
        }
        const user = await User.findOne({email})
        if (user.recoveryCode !== recoveryCode) {
            res.status(404).json("Invalid link")
            return; 
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedPassword
        await user.save();
        res.status(200).json("Password changed")
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})


router.get('/newfriend/:username', login, async(req, res) => {
    try {
        const username = req.params.username
        const user = await User.findOne({username})
        res.status(200).json(true)
    } catch (error) {
        res.status(404).json("No user found")
    }
    
})

router.post("/change_profile_pic",login, async(req, res) => {
    try {
        const { profilePic } = req.body
        const token = req.cookies[process.env.COOKIE_NAME]
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        const user = await User.findById(decoded.id)
        if(!profilePic){
            res.status(401).json("Invalid profile pic")
            return;
        }
        user.profilePic = profilePic
        await user.save()
        res.status(200).json(profilePic)
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})
router.get("/logout", (req, res) => {
    try {
        res.clearCookie(process.env.COOKIE_NAME).status(200).json("Logout")
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})

router.get("/user/:username",login, async(req, res) => {
    try {
        const { username } = req.params
        const user = await User.findOne({username})
        res.status(200).json({username: user.username, profilePic: user.profilePic})
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})


export default router