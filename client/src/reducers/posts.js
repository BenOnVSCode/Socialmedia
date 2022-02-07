let initialState = {
    posts: [],
    myposts: [],
    message: '',
    username: '',
    comment: '',
    commentMessage: '',
    post: []
}
export default (postsState = initialState, action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return {
                ...postsState,
                posts: action.payload
            }
        case 'FETCH_MY_POSTS_SUCCESS':
            return {
                ...postsState,
                myposts: action.payload.posts,
                username: action.payload.username
            }
        case 'POST_DELETED':
            return {
                ...postsState,
                myposts: action.payload.posts
            }
        case 'POST_ADDED':
            return {
                ...postsState,
                posts: [...postsState.posts, action.payload.post],
                myposts : action.payload.posts
            }
            
        case 'POST_NOT_ADDED':
            return {
                ...postsState
            }
        case 'COMMENT_SUCCESS':
            return {
                ...postsState,
                post: action.payload
            }
        case 'COMMENT_ERROR':
            return {
                ...postsState
            }
        case 'LIKE_SUCCESS':
            if(postsState.post._id === action.payload._id) {
                return {
                    ...postsState,
                    post: action.payload
                }
            }
            
        case 'LIKE_ERROR':
            return {
                ...postsState
            }
        case 'UNLIKE_SUCCESS':
            if(postsState.post._id === action.payload._id) {
                return {
                    ...postsState,
                    post: action.payload
                }
            }
            else {
                return {
                    ...postsState
                }
            }
        case 'UNLIKE_ERROR':
            return {...postsState}
        case 'GET_POST_SUCCESS':
            return {
                ...postsState,
                post: action.payload[0]
            }
        case 'GET_POST_ERROR':
            return {...postsState}
        default:
            return postsState ;
    }
} 