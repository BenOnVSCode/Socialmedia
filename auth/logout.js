require('dotenv').config();
const express = require('express');
const router = express.Router();
const auth = require('./middleware/auth')

router.post('/logout', auth, (req, res) => {
    try {
        res.clearCookie(process.env.COOKIE_NAME).status(200).json('LOGOUT SUCCESS')
    } catch (error) {
        res.status(501).json('Something went wrong')
        console.log(error)
    }
}) 

module.exports = router 