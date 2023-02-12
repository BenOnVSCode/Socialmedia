import { Flex } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { getPosts } from '../redux/actions/posts';
import Post from './Post'
function Posts() {
    const dispatch = useDispatch()
    const {username} = useSelector(state => state.auth)
    useEffect(() => {
        dispatch(getPosts())
    }, [])
    const { posts }= useSelector(state => state.posts) 
    return ( 
        <Flex flexDirection={"row"} flexWrap={"wrap"} justifyContent={"center"}>
        {
            posts.map((post, index) => (
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
