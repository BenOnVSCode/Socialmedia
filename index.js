import dotenv from "dotenv"
dotenv.config()
import express from "express"
import mongoose, { mongo } from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser"
import path from "path"
import bodyParser from "body-parser"
import posts from './routes/posts/posts.js'
import auth from './auth/index.js'
import reactions from './routes/posts/reactions.js'

const app = express();
const PORT = process.env.PORT || 7021 ;


app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(bodyParser.json({
    limit: '50mb'
}));

  
app.use(express.json());
app.use(cookieParser())
app.use('/api/', auth);
app.use('/api/', posts)
app.use('/api/', reactions)


mongoose.set('strictQuery', false)
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true },  () => {
    console.log("Mongo connected !")
});


app.use(express.static('client/build'))
app.get('*', (req, res) => {
    res.sendFile(path.resolve(path.dirname(new URL(import.meta.url).pathname), 'client', 'build', 'index.html'))
})


app.listen(PORT)