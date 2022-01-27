import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { getonepost } from '../actions/posts';
import { useLocation } from 'react-router-dom'
import Post from './Post';
import { Flex } from '@chakra-ui/react';
import Navbar from './Navbar';
function SinglePost() {
    const location = useLocation();
    const post = useSelector(state => state.posts.post);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getonepost(location.pathname.split('/').reverse()[0]))
    }, [])
    return (
        <Flex justifyContent={"center"} flexDirection={"column"} alignItems={'center'}>
            <Navbar home={true} />
            <Post post={post} commentPath={false} width="90vw" />
        </Flex>
    )
}

export default SinglePost;
