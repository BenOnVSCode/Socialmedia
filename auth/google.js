const express = require('express');
const router = express.Router();
const {OAuth2Client} = require('google-auth-library')
const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const jwtKey = process.env.JWT_KEY
const client = new OAuth2Client(process.env.google)
const jwtCookie = process.env.COOKIE_NAME


router.post('/google', (req, res) => {
    const { token }  = req.body ;
    client.verifyIdToken({idToken: token, audience: process.env.google})
        .then(async response => { 
            const { email_verified, name, email} = response.payload
            const hashedPassword = await bcrypt.hash((email+name), 10)
            if(email_verified) {
                User.findOne({ email: email})
                    .then(async (user) => {
                        if(!user) {
                            const newUser = new User({
                                name: name,
                                username: name,
                                email: email,
                                password: hashedPassword,
                            })
                            await newUser.save()
                            jwt.sign(
                                { id: newUser.id },
                                jwtKey,
                                (err, token) => {
                                    res.cookie(jwtCookie, token, { httpOnly: true, maxAge:( 60 * 100 * 60 * 60 ) / 2}).json(newUser)
                                }
                            )
                        }
                        if(user) {
                            jwt.sign(
                                { id: user.id },
                                jwtKey,
                                (err, token) => {
                                    res.cookie(jwtCookie, token, { httpOnly: true, maxAge:( 60 * 100 * 60 * 60 ) / 2}).json(user)
                                }
                            )
                        }
                    })
            }
            else {
                res.status(404)
            }
        })
})

module.exports = router