import { Flex, Text } from '@chakra-ui/react';
import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getMyPosts } from '../redux/actions/posts';
import Navbar from './Navbar';
import Post from './Post';
function Profile() {
    const posts = useSelector(state => state.posts.myposts)
    const dispatch = useDispatch()
    const username = useSelector(state => state.auth.username)

    useEffect(() => {
        dispatch(getMyPosts())
    }, [])
    return (
        <Flex flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
            <Navbar homebtn={true} />
            <Text  textAlign={"center"} fontSize={"2rem"} fontWeight={"bold"} color={"#2d3748"} width={"90vw"} marginTop={"1rem"} >My posts</Text>
            <Flex  flexDirection={"row"} flexWrap={"wrap"} justifyContent={"center"} >
                {
                    posts.map((post, index) => (
                        <Post  post={post} key={index} delete={true} commentPath={true}
                        licked={
                            post.likes.indexOf(username) !== -1 ? (
                                true   
                            ) : (
                                false
                            )
                        } 
                        />    
                    ))
                }
            </Flex>
        </Flex>
  )
}

export default Profile;
