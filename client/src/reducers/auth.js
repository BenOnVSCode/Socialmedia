

let initialState = {
    loading: false,
    loggedIn: false,
    name: null,
    username: null,
}

export default (state = initialState, action) => {
    switch(action.type){
        case "LOGOUT":
            window.location.replace('/')
            return {
                ...state,
                loggedIn: false,
                name: null,
                username: null
            }
        case "LOADING":
            return {
                ...state,
                loading: true
            }
        case "LOGIN_SUCCESS":
            return {
                ...state,
                loading: false,
                name: action.payload.name,
                username: action.payload.username,
                loggedIn: true
            }
        case "LOGIN_ERROR":
            return {
                ...state,
                loading: false,
                loggedIn: false,
                name: null,
                username: null,
                posts: null
            }
        case "REGISTER_SUCCESS":
            return {
                ...state,
                loading: false
            }
        case "REGISTER_ERROR":
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}