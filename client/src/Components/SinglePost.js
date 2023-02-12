import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { getonepost } from '../redux/actions/posts';
import { useLocation, useParams } from 'react-router-dom'
import Post from './Post';
import { Flex } from '@chakra-ui/react';
import Navbar from './Navbar';
function SinglePost() {
    const { id } = useParams()
    const {post}= useSelector(state => state.posts);
    const {username } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getonepost(id))
    }, [])
    return (
        <Flex justifyContent={"center"} flexDirection={"column"} alignItems={'center'}>
            <Navbar home={true} />
            <Post licked={post.likes?.indexOf(username) !== -1 ? true : false} post={post} commentPath={false} width="90vw" />
        </Flex>
    )
}

export default SinglePost;
