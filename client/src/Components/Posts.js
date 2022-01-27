import { Flex } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { getPosts } from '../actions/posts';
import Post from './Post'
function Posts() {
    const dispatch = useDispatch()
    const username = useSelector(state => state.auth.username)
    useEffect(() => {
        dispatch(getPosts())
    }, [])
    const posts = useSelector(state => state.posts.posts);
    let newPosts = [] ;
    for (let i = 0; i < posts.length; i++) {
        for (let z = 0; z < posts[i].length; z++ ) {
            newPosts.push(posts[i][z])
        }
    }
    return (
        <Flex flexDirection={"row"} flexWrap={"wrap"} justifyContent={"center"}>
        {
            newPosts.map((post, index) => (
                <Post commentPath={true} key={index} licked={
                    post.likes.indexOf(username) !== -1 ? (
                        true   
                    ) : (
                        false
                    )
                } 
                post={post}
                  />
            ))
        }
        </Flex>
    );
}

export default Posts;
