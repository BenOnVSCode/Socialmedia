require('dotenv').config()
const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const auth = require('../../auth/middleware/auth');
const jwt = require('jsonwebtoken')
const uuid = require('uuid');


const getId = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const id = decoded.id 
    return id
}

//----------------------------->>


//like a post :<3
router.put('/posts/:id/likes', auth, async (req, res) => {
    try {
        const token = req.cookies.socialtoken;
        const postID = req.params.id
        const id = await getId(token);
        const liker = await User.findById(id)
        const user = await User.findOne({username: req.body.username})
        await user.posts.map(post => {
            if(post._id.toString() === postID){
                post.likes = [...post.likes, liker.username]
            }
        })
        await user.save()
        res.status(200).json('liked')
    } catch (error) {
        res.status(500).json('Somthing went wrong!')
    }
})


//unlike a post 
router.delete('/posts/:id/likes', auth, async (req, res) => {
    try {
        const token = req.cookies.socialtoken;
        const id = await getId(token);
        const unliker = await User.findById(id)
        const user = await User.findOne({username: req.body.username})
        await user.posts.map((post) => {
            if(post._id.toString() === req.params.id){
                post.likes.splice(post.likes[post.likes.indexOf(unliker.username)], 1)
            }
        })
        await user.save()
        res.status(200).json('Unlicked?')
    } catch(error) {
        res.status(500).json("Somthing went wrong ?")
        console.log(error)
    }
    
})

//get people who like a post :<3
router.get('/posts/:id/likes', auth, async (req, res) => {
    const user = await User.findById(req.params.user_id);
    const posts = await user.posts;
    const post = await posts.filter((post) => post.id === req.params.id);
    res.json(post[0].likes)
})

//comment a post 
router.put('/posts/:id/comments', auth, async (req, res) => {
    const token = req.cookies.socialtoken
    const { comment } = req.body
    if(!comment || comment.length < 1) res.status(404).json({message: `comment can't be less than 1 letter ${comment}`})
    else {
        const id = await getId(token);
        const commenter = await User.findById(id)
        const users = await User.find()
        const posts = users.map(user => {
            return user.posts
        })
        const newposts = []
        for(i = 0 ; i < posts.length ; i++) {
            for(j=0; j<posts[i].length; j++) {
                newposts.push(posts[i][j])
            }
        }
        const post = newposts.filter(post => {
            return post.id === req.params.id
        })
        const user = await User.findById(post[0].poster)
        const newPost = await user.posts.filter(post => {
            return post.id === req.params.id
        })
        await newPost[0].comments.push({
            user: commenter.username,
            descreption: comment
        })
        await user.save()
        res.json(newPost[0])
    }
})

//get comments on post 
router.get('posts/:id/comments', auth, async (req, res) => {
    const user = await User.findById(req.params.user_id);
    const posts = await user.posts;
    const post = await posts.filter((post) => post.id === req.params.id);
    res.json(post[0].comments)
})

module.exports = router 