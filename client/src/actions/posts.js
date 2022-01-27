import * as api from '../api'
import swal from 'sweetalert'



export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        dispatch({ type: 'FETCH_ALL', payload: data})
    } catch (error) {
        console.log(error.response.data)
    }
}

export const getMyPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchMyPosts();
        dispatch({type: 'FETCH_MY_POSTS_SUCCESS', payload: data})
    } catch (error) {   
        dispatch({ type: 'FETCHING_USER_POSTS_ERROR' })
    }
}

export const deleteapost = (id) => async (dispatch) => {
    try {
        const { data } = await api.deletePost(id)
        dispatch({type: 'POST_DELETED', payload: data});
        swal(data.message, "", "success")
    } catch(err) {
        swal(err.response.data, "", "error")
    }
}

export const addApost = (title, descreption) => async (dispatch) => {
    try {
        const { data } = await api.addPost(title, descreption);
        dispatch({type: 'POST_ADDED', payload: data})
        dispatch(getPosts())
        swal(data.message, "", "success")
    } catch (error) {
        dispatch({type: 'POST_NOT_ADDED', payload: 'Somthing went wrong'})
        swal(error.response.data.message, "", "error")
    }
}
export const getonepost = (id) => async (dispatch) => {
    try {
        const { data } = await api.getpostbyid(id)
        dispatch({type: 'GET_POST_SUCCESS', payload: data})
    } catch (error) {
        dispatch({type: 'GET_POST_ERROR', payload: 'Somthing went wrong'})
    }
}