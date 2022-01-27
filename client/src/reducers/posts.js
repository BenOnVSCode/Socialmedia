let initialState = {
    posts: [],
    myposts: [],
    message: '',
    username: '',
    comment: '',
    commentMessage: '',
    post: []
}
export default (posts = initialState, action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return {
                ...posts,
                posts: action.payload
            }
        case 'FETCH_MY_POSTS_SUCCESS':
            return {
                ...posts,
                myposts: action.payload.posts,
                username: action.payload.username
            }
        case 'POST_DELETED':
            return {
                ...posts,
                myposts: action.payload.posts
            }
        case 'POST_ADDED':
            return {
                ...posts,
                myposts : action.payload.posts
            }
            
        case 'POST_NOT_ADDED':
            return {
                ...posts
            }
        case 'COMMENT_SUCCESS':
            return {
                ...posts,
                post: action.payload
            }
        case 'COMMENT_ERROR':
            return {
                ...posts
            }
        case 'LIKE_SUCCESS':
            if(posts.post._id === action.payload._id) {
                return {
                    ...posts,
                    post: action.payload
                }
            }
            
        case 'LIKE_ERROR':
            return {
                ...posts
            }
        case 'UNLIKE_SUCCESS':
            if(posts.post._id === action.payload._id) {
                return {
                    ...posts,
                    post: action.payload
                }
            }
            else {
                return {
                    ...posts
                }
            }
        case 'UNLIKE_ERROR':
            return {...posts}
        case 'GET_POST_SUCCESS':
            return {
                ...posts,
                post: action.payload[0]
            }
        case 'GET_POST_ERROR':
            return {...posts}
        default:
            return posts ;
    }
} 