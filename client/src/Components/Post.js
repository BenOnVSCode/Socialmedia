import React, { useState } from 'react';
import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    Avatar,
    useColorModeValue,
    Button,
    Flex,
    Table,
    Thead,
    Tr,
    Th,
    Td,
    Tfoot,
    Tbody,
    Input,
    Image,
  } from '@chakra-ui/react';
import { AiFillLike, AiFillDislike } from 'react-icons/ai'
import { comment, like, unlike } from '../actions/reactions';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { deleteapost } from '../actions/posts';
import { PostImage } from './style/File';
function Post(props) {
    const dispatch = useDispatch()
    const [textcomment, settextcomment] = useState('')


    
  return (
    <Center py={6}  width={props.width || "300px"} margin={"1rem"}>
    <Box
      
      w={'full'}
      bg={useColorModeValue('white', 'gray.900')}
      boxShadow={'2xl'}
      rounded={'md'}
      p={6}
      overflow={'hidden'}>
      <Stack>
        <Text
          color={'green.500'}
          textTransform={'uppercase'}
          fontWeight={800}
          fontSize={'sm'}
          letterSpacing={1.1}>
          POST
        </Text>
        <Heading
          color={useColorModeValue('gray.700', 'white')}
          fontSize={'2xl'}
          fontFamily={'Poppins'}
          >
          {props.post.title}
        </Heading>
        <Text color={'gray.500'}>
          {props.post.descreption}
        </Text>
        {
          props.post.img ? <Image objectFit="scale-down" borderRadius="5px" src={props.post.img}/> : null
        }
      </Stack>
      <Stack marginBottom={"1rem"} mt={6} direction={'row'} spacing={4} align={'center'}>
        <Stack direction={'column'} spacing={0} fontSize={'sm'}>
          <Text fontWeight={600}>{props.post.username}</Text>
          <Text color={'gray.500'}>{props.post.date}</Text>
        </Stack>
      </Stack>
        <Stack>
            {
                props.licked ? <AiFillDislike cursor={"pointer"} fill='#2d3748' fontSize={"2rem"} onClick={() => dispatch(unlike(props.post._id, props.post.username))}/> : <AiFillLike cursor="pointer" onClick={() => dispatch(like(props.post._id, props.post.username))} fill='#2d3748' fontSize={"2rem"} />
            }
            {
                props.commentPath ? (null) : (
                   props.post.comments ? (
                    <Table variant={"simple"}>
                        <Thead>
                            <Tr>
                            <Th>user</Th>
                            <Th>comment</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                        {
                            props.post.comments.map((comment, index) => (
                               <Tr>
                                   <Td>{comment.user}</Td>
                                   <Td>{comment.descreption}</Td>
                               </Tr> 
                            ))
                        }
                        </Tbody>
                    </Table>
                    
                   ) : (
                       null
                   )
                ) 
            }
            { props.commentPath ? null : (
                <Input placeholder='Write a comment' onChange={(e) => settextcomment(e.target.value)} />
            )}
            {
              props.commentPath ? (
                <Link style={{width: "100%"}} to={`/posts/${props.post._id}`}>
                  <Button width={"100%"}>
                    Comment
                  </Button>
                </Link>
              ) : (
                <Button onClick={()=> dispatch(comment(props.post._id, textcomment))}>Post a comment</Button>
              )
            } 
            
            {
                props.delete ? <Button colorScheme={"teal"} onClick={() => dispatch(deleteapost(props.post._id))}>Delete</Button> : " "
            }
        </Stack>
    </Box>
  </Center>
  )
}

export default Post;
