require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken')
const jwtKey = process.env.JWT_KEY
const jwtCookie = process.env.COOKIE_NAME




router.get('/auth', (req, res) => {  
    try {
        const token = req.cookies.socialtoken
        if(!token) res.status(401).json('Invalid token')
        else { 
            const decoded = jwt.verify(token, jwtKey)
            User.findById(decoded.id, (err, user) => {
                if(!user) res.status(500)
                res.status(200).json(user)
            })
        }
    } catch(error) {
        res.status(501).json('Something went wrong')
    }
    
})

router.post('/login', (req, res) => {
    try {
        const { username, password } = req.body ;
        if(!username || !password) {
            return res.status(400).json({ msg: 'Please enter all field'})
        }
        User.findOne({username}, (err, user) => {
            if(!user) return res.status(400).json({ msg: 'User does not exist'})
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({ msg: 'invalid cre'})
                    jwt.sign(
                        { id: user.id },
                        jwtKey,
                        (err, token) => {
                            res.cookie(jwtCookie, token, { httpOnly: true, maxAge:( 60 * 100 * 60 * 60 ) / 2}).json(user)
                        }
                    )
            })
        })
           
    } catch(error) {
        res.status(500)
    }
        
})


module.exports = router