import { createSlice} from '@reduxjs/toolkit'
import { addApost, comment, deleteapost, getMyPosts, getonepost, getPosts, like } from './actions/posts'

let initialState = {
    posts: [],
    myposts: [],
    message: '',
    username: '',
    comment: '',
    commentMessage: '',
    post: []
}

export const authSlice = createSlice({
    name: 'posts',
    initialState,
    extraReducers: builder => {
        builder
            .addCase(getPosts.fulfilled, (state, action) => {
                state.posts = action.payload
            })
            .addCase(getMyPosts.fulfilled, (state, action) => {
                state.myposts = action.payload.posts
                state.username = action.payload.username
            })
            .addCase(deleteapost.fulfilled, (state, action) => {
                state.myposts = action.payload
            })
            .addCase(addApost.fulfilled, (state, action) => {
                state.posts = [...state.posts, action.payload]
                state.myposts = action.payload.posts
            })
            .addCase(comment.fulfilled, (state, action) => {
                state.post = action.payload
            })
            .addCase(like.fulfilled, (state, action) => {
                if(state.post._id === action.payload._id){
                    state.post = action.payload
                }
            })
            .addCase(getonepost.fulfilled, (state, action) => {
                state.post = action.payload[0]
            })    
    }
})


export default authSlice.reducer