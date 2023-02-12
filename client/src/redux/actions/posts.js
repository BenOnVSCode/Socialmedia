import * as api from "../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPosts = createAsyncThunk("posts/getPosts", async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        return data;
    } catch (error) {
        throw error.response.data || "Something went wrong";
    }
});

export const getMyPosts = createAsyncThunk(
    "posts/getMyPosts",
    async (dispatch) => {
        try {
            const { data } = await api.fetchMyPosts();
            return data;
        } catch (error) {
            throw error.response.data || "Something went wrong";
        }
    }
);

export const deleteapost = createAsyncThunk(
    "posts/deletePost",
    async (id, dispatch) => {
        try {
            const { data } = await api.deletePost(id);
            return data;
        } catch (error) {
            throw error.response.data || "Something went wrong";
        }
    }
);

export const addApost = createAsyncThunk(
    "posts/addPost",
    async (params, dispatch) => {
        try {
            const { title, descreption, file } = params;
            const { data } = await api.addPost(title, descreption, file);
            return data;
        } catch (error) {
            throw error.response.data || "Something went wrong";
        }
    }
);

export const getonepost = createAsyncThunk(
    "posts/getPostById",
    async (id, dispatch) => {
        try {
            const { data } = await api.getpostbyid(id);
            return data;
        } catch (error) {
            throw error.response.data || "Something went wrong";
        }
    }
);

export const comment = createAsyncThunk(
    "posts/comment",
    async (params, dispatch) => {
        try {
            const { data } = await api.commentOnApost(params.postID, params.comment);
            return data;
        } catch (error) {
            throw error.response.data || "Something went wrong";
        }
    }
);

export const like = createAsyncThunk(
    "posts/like",
    async (params, dispatch) => {
        try {
            const { data } = await api.like(params.postID, params.username)
            return data;
        } catch (error) {
            throw error.response.data || "Something went wrong";
        }
    }
);

export const unlike = createAsyncThunk(
    "posts/unlike",
    async (params, dispatch) => {
        try {
            const { data } = await api.unlike(params.postID, params.username)
            
            return data;
        } catch (error) {
            throw error.response.data || "Something went wrong";
        }
    }
);