const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');


router.post('/register', async (req, res) => {
    try {
        const { username, password, name, email } = req.body ;
        const salt = bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, 10)
        User.findOne({username: username}, async (err, user) => {
            if(user) res.status(404).json({ message: "This username is taken"})
            if(!user) {
                User.findOne({email: email}, async(err, user) => {
                    if(user) res.status(400).json({message: "This email is taken"})
                    const newUser = new User({
                        name: name,
                        username: username,
                        email: email,
                        password: hashedPassword
                    })
                    await newUser.save()
                    res.status(200).json({message: "Account has been created"})
                })
            }
        })
    } catch(error) {
        res.status(404).json({message: 'Somthing went wrong !'})
    }
})



module.exports = router