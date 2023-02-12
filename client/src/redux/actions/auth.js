import {createAsyncThunk} from "@reduxjs/toolkit"
import * as api from "../../api/index"

export const signIn = createAsyncThunk(
    'auth/signin',
    async (info) => {
        try {
            const {email, password} = info
            const response = await api.APIsignIn(email, password)
            return response.data
        } catch (error) {
            throw error.response.data || "Something went wrong"
        }
    }
)   

export const signUp = createAsyncThunk(
    "auth/signup",
    async (info) => {
        try {
            const {username, email, password} = info
            const response = await api.APIsignUp(username, email, password)
            return response.data
        } catch (error) {
            throw error.response.data || "Something went wrong"
        }
        
    }
)

export const verify = createAsyncThunk(
    "auth/verify",
    async (info) => {
        try {
            const {email, code} = info
            const response = await api.APIverify(email, code)
            return response.data
        } catch (error) {
            throw error.response.data || "Something went wrong"
        }
    }
)

export const sendRecoveryLink = createAsyncThunk(
    "auth/sendrecovery",
    async (info) => {
        try {
            const {email} = info
            const response = await api.APIsendRecoveryLink(email)
            return response.data
        } catch (error) {
            throw error.response.data || "Something went wrong"
        }
    }
)

export const checkRecoveryLink = createAsyncThunk(
    "auth/checkrecoverylink",
    async (info) => {
        try {
            const {email, code} = info
            const response = await api.APIcheckRecoveryLink(email, code)
            return {email, code}
        } catch (error) {
            throw error.response.data || "Something went wrong"
        }
    }
)

export const changePassword = createAsyncThunk(
    "auth/changepassword",
    async (info) => {
        try {
            const {email, code, password} = info
            const response = await api.APIchangepassword(email, code, password)
            return response.data
        } catch (error) {
            throw error.response.data || "Something went wrong"
        }
    }
)

export const CheckLogin = createAsyncThunk(
    "auth/checklogin",
    async() => {
        try {
            const response = await api.APIcheckLogin()
            return response.data
        } catch (error) {
            throw error.response.data || "Something went wrong"
        }
    }
)

export const Logout = createAsyncThunk(
    "auth/logout",
    async () => {
        try {
            const { data } = await api.APIlogout()
            return data
        } catch (error) {
            throw error.response.data || "Something went wrong"
        }
    }
)

export const ChangeProfilePic = createAsyncThunk(
    "auth/changePhoto",
    async (link) => {
        try {
            const { data } = await api.APIchangeProfilePic(link)
            return data
        } catch (error) {
            throw error.response.data
        }
    }
)