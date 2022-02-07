import axios from 'axios'

export const login = (username, password) => axios.post('/api/login', {username: username, password: password})
export const register = (name, username, email, password) => axios.post('/api/register', {name: name, username: username, password: password, email: email})
export const auth = () => axios.get('/api/auth')
export const deletePost = (id) => axios.delete(`/api/user/posts`, {ID: id});
export const addPost = (title, descreption, img) => axios.post(`/api/user/posts`, {title: title, descreption: descreption, img: img});
export const commentOnApost = (postID, comment) => axios.put(`/api/posts/${postID}/comments`, {comment: comment})
export const getpostbyid = (id) => axios.get(`/api/posts/${id}`)
export const like = (id, username) => axios.put(`/api/posts/${id}/likes`, {username: username})
export const unlike = (id, username) => axios.delete(`/api/posts/${id}/likes`,{ data: {username: username}})
export const fetchMyPosts = () => axios.get(`/api/user/posts`);
export const fetchPosts = () => axios.get(`/api/posts`);
export const loginwithgoogle = (token) => axios.post('/api/google', {token: token})
export const logout = () => axios.post('/api/logout')