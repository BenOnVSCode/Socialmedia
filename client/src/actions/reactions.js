import * as api from '../api'
import { getPosts } from './posts';

export const comment = (postID,  comment) => async (dispatch) => {
    try {
        const { data } = await api.commentOnApost(postID, comment);
        dispatch({ type: 'COMMENT_SUCCESS', payload: data})
    } catch (error) {
        dispatch({ type: 'COMMENT_ERROR', payload: 'Somthing went wrong'})
    }
}

export const like = (id) => async (dispatch) => {
    try {
        const { data } = await api.like(id)
        dispatch({ type: 'LIKE_SUCCESS', payload: data})
        dispatch(getPosts())
    } catch (error) {
        dispatch({ type: 'LIKE_ERROR', payload: 'Somthing went wrong'})
    }
}

export const unlike = (id) => async (dispatch) => {
    try {
        console.log(id)
        const { data } = await api.unlike(id)
        dispatch({ type: 'UNLIKE_SUCCESS', payload: data})
        dispatch(getPosts())
    } catch (error) {
        dispatch({ type: 'UNLIKE_ERROR', payload: 'Somthing went wrong'})
    }
}