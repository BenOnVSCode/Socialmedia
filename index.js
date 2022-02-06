require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 7021 ;
const posts = require('./routes/posts/posts');
const login = require('./auth/login')
const register = require('./auth/register')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logout = require('./auth/logout');
const path = require('path')
const reactions = require('./routes/posts/reactions');
const google = require('./auth/google')
const bodyParser = require('body-parser')
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(bodyParser.json({
    limit: '50mb'
}));

  
app.use(express.json());
app.use(cookieParser())
app.use('/api/', login);
app.use('/api/', register);
app.use('/api/', logout);
app.use('/api/', google)
app.use('/api/', posts)
app.use('/api/', reactions)



mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true },  () => {
    console.log("Mongo connected !")
});

if(process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT)