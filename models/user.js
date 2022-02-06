const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 15
    },
    posts: [{
        poster: String,
        descreption: String,
        title: String,
        username: String,
        name: String,
        img: String,
        date: String,
        likes: [String],
        comments: [Object],
    }],
    likedPosts: [Object],
    commentedPost: [Object]
});



module.exports = mongoose.model('User', UserSchema);