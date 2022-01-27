require('dotenv').config();
const express = require('express');
const router = express.Router();
const auth = require('./middleware/auth')

router.post('/logout', auth, (req, res) => {
    try {
        const token = req.cookies.trivia
        const decoded = jwt.verify(token, KEY)
        User.findById(decoded.id, async (err, user) => {
            if(!user) res.status(500)
            user.online = false
            await user.save()
            res.status(200).json("Logout with success")
        })
    } catch (error) {
        res.status(501).json('Something went wrong')
        console.log(error)
    }
}) 

module.exports = router 