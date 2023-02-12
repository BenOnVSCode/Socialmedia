import { model, Schema } from "mongoose";
const UserSchema = new Schema({
    username: {
        type:String,
        minLength: 4,
        required: true,
        unique: true,
    },
    profilePic: {
        type:String,
        default: "/assets/default.png"
    },
    email: {
        type:String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        minLength: 8,
        required: true,
    },
    confirmationCode: {
        type:String,
        required: true
    },
    confirmed: {
        type:Boolean,
        default:false
    },
    recoveryCode: {
        type: String,
        default: null
    },
    date: {
        type:Date
    },
    posts: [{
        poster: String,
        descreption: String,
        title: String,
        username: String,
        img: String,
        date: String,
        likes: [String],
        comments: [Object],
    }]
});



export default model('User', UserSchema);