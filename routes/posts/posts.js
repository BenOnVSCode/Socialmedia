
import {Router} from "express"
import User from '../../models/user.js'
import auth from '../../auth/middleware/auth.js'
import jwt from 'jsonwebtoken'

const router = Router();


const getId = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const id = decoded.id 
    return id
}

router.get('/myposts', auth, async (req, res) => {
    try {
        const token = req.cookies[process.env.COOKIE_NAME]
        const id = getId(token)
        const user = await User.findById(id)
        res.status(200).json({
            posts: user.posts,
            username: user.username
        })
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
});



router.post('/user/posts', auth,  async (req, res) => {
    const { descreption, title, img } = req.body 
    if(!descreption || descreption.length === 0 || !title || title.length < 2) res.status(404).json({message: 'Descreption and title cannot be empty'})
    else {
        try {
            const id = getId(req.cookies[process.env.COOKIE_NAME])
            const user = await User.findById(id)
            const newPost = {
                poster: user.id,
                descreption: descreption,
                title: title,
                username: user.username,
                name: user.name,
                img: img,
                date: new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}),
                likes: [],
                comments: [],
            }
            await user.posts.push(newPost)
            await user.save() 
            res.json({posts: user.posts, post: newPost, message: 'Posted!'}) 
        } catch (error) {
            res.status(500).json({message: "Somthing went wrong try again"})
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
        for(let i = 0 ; i < posts.length ; i++) {
            for(let j=0; j<posts[i].length; j++) {
                newposts.push(posts[i][j])
            }
        }
        const post = newposts.filter(post => {
            return post.id === req.params.id
        })

        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({message: 'Somthing went wrong'})
    }
    
})


//GET all posts 
router.get('/posts', auth, async (req, res) => {
    try {
        const users = await User.find()
        const posts = users.map(user => {
            return user.posts
        })  
        let newposts = []
        posts.map(userposts => {
            userposts.map(post => {
                newposts.push(post)
            })
        })
        res.status(200).json(newposts)
    } catch (error) {
       
    }
})



export default router