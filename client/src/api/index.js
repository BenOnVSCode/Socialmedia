import axios from 'axios'

export const login = (username, password) => axios.post('/login', {username: username, password: password})
export const register = (name, username, password) => axios.post('/register', {name: name, username: username, password: password})
export const auth = () => axios.get('/auth')
export const deletePost = (id) => axios.delete(`/user/posts`, {ID: id});
export const addPost = (title, descreption) => axios.post(`/user/posts`, {title: title, descreption: descreption});
export const commentOnApost = (postID, comment) => axios.put(`/posts/${postID}/comments`, {comment: comment})
export const getpostbyid = (id) => axios.get(`/posts/${id}`)
export const like = (id) => axios.put(`/posts/${id}/likes`)
export const unlike = (id) => axios.delete(`/posts/${id}/likes`)
export const fetchMyPosts = () => axios.get(`/user/posts`);
export const fetchPosts = () => axios.get(`/posts`);
