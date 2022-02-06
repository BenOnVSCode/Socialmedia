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

//GET USER POSTS <:3
router.get('/user/posts', auth,  async (req, res) => {
    const token = req.cookies.socialtoken
    const id = getId(token)
    const { posts } = await User.findById(id)
    const user = await User.findById(id)
    res.status(200).json({
        posts: posts,
        username: user.username
    })
});


//POST A NEW POST :-:
router.post('/user/posts', auth,  async (req, res) => {
    const { descreption, title, img } = await req.body 
    if(!descreption || descreption.length === 0 || !title || title.length < 2) res.status(404).json({message: 'Descreption and title cannot be empty'})
    else {
        try {
            const id = getId(req.cookies.socialtoken)
            const user = await User.findById(id)
            const newPost = {
                poster: user.id,
                descreption: descreption,
                title: title,
                username: user.username,
                name: user.name,
                img: img,
                date: `${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()} time: ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
                likes: [],
                comments: [],
            }
            user.posts.push(newPost)
            user.save() 
            res.json({posts: user.posts, message: 'Posted!'}) 
        } catch (error) {
            res.status(404).json({message: "Somthing went wrong try again"})
        }
        
    }   
})


//DELETE a post -_- 
router.delete('/user/posts', auth, async (req, res) => {
    try {
        const token = req.headers.cookie.split('=')[1]
        const { ID } = req.body 
        const id = getId(token)
        const user = await User.findById(id);
        const posts = user.posts
        posts.splice(posts.findIndex(i => i.id === ID), 1)
        user.save()
        const newPosts = await user.posts
        res.json({message: 'post deleted', posts: newPosts})
    } catch (error) {
        res.status(500).json({message: 'Somthing went wrong'})
    }
})


//get a post by id 
router.get('/posts/:id', auth, async (req, res) => {
    try {
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

        res.json(post)
    } catch (error) {
        res.status(500).json({message: 'Somthing went wrong'})
    }
    
})


//GET all posts 
router.get('/posts', auth, async (req, res) => {
    const users = await User.find()
    const posts = users.map(user => {
        return user.posts
    })
    res.json(posts)
})



module.exports = router 