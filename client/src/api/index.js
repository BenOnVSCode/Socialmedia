import axios from "axios"

export const APIsignIn = (email, password) => axios.post('/api/signin', {email, password})
export const APIsignUp = (username, email, password) => axios.post('/api/signup', {username, email, password})
export const APIverify = (email, code) => axios.post(`/api/verify/${email}`, {code})
export const APIsendRecoveryLink = (email) => axios.post(`/api/sendrecoverylink`, {email})
export const APIcheckRecoveryLink = (email, code) => axios.post(`/api/checklink`, {email, code})
export const APIchangepassword = (email, code, password) => axios.post(`/api/changepassword`, {email, recoveryCode:code, newPassword:password})
export const APIcheckLogin = () => axios.get("/api/signin") 
export const APIlogout = () => axios.get("/api/logout")
export const APIchangeProfilePic = (profilePic) => axios.post("/api/change_profile_pic", {profilePic})
export const deletePost = (id) => axios.delete(`/api/user/posts`, {ID: id});
export const addPost = (title, descreption, img) => axios.post(`/api/user/posts`, {title: title, descreption: descreption, img: img});
export const commentOnApost = (postID, comment) => axios.put(`/api/posts/${postID}/comments`, {comment: comment})
export const getpostbyid = (id) => axios.get(`/api/posts/${id}`)
export const like = (id, username) => axios.put(`/api/posts/${id}/likes`, {username: username})
export const unlike = (id, username) => axios.delete(`/api/posts/${id}/likes`,{ data: {username: username}})
export const fetchMyPosts = () => axios.get("/api/myposts");
export const fetchPosts = () => axios.get(`/api/posts`);
