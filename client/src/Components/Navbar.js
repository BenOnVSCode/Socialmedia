import React from 'react';
import {
    Box,
    Flex,
    HStack,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    FormControl,
    FormLabel,
    Input,
    ModalFooter,
    useColorModeValue,
    useDisclosure,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Textarea,
    Text,
} from '@chakra-ui/react';   
import { AddIcon } from '@chakra-ui/icons';
import { addApost, getPosts } from '../actions/posts';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { FileBtn, FileWrap, PostImage, PostImageContainer, RemovePostImgae } from './style/File';
import { Logout } from '../actions/auth';
const Navbar = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef()
    const [title, setitle] = React.useState()
    const [descreption, setdescreption] = React.useState()
    const [file, setfile] = React.useState(null)
    const finalRef = React.useRef()
    const dispatch = useDispatch()

    const close = () => {
      dispatch(addApost(title, descreption, file))
      setTimeout(() => {
        onClose()
        setfile(null)
      }, 1000)
      
    }
    const getBase64 = (file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setfile(reader.result)
      }
      reader.readAsDataURL(file)
    }
       
  return (
    <>
    <Box width={"100%"} bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <HStack spacing={8} alignItems={'center'}>
          <Box fontWeight={"bolder"}>SM</Box>
        </HStack>
        <Flex alignItems={'center'}>
          {
            props.homebtn ? (
              <Button
            variant={'solid'}
            colorScheme={'teal'}
            size={'sm'}
            mr={2}
            onClick={() => dispatch(Logout())}
            >
            Logout
          </Button>
            ) : null
          }
          {
            props.home ? (
              <Button colorScheme={"teal"} size={"sm"} mr="4">
                <Link to="/"> Home</Link>
              </Button>
            ) : (
              <Button
            variant={'solid'}
            colorScheme={'teal'}
            size={'sm'}
            mr={2}
            leftIcon={<AddIcon />}
                onClick={onOpen}
            >
            New post
          </Button>
            )
          }
          <Button colorScheme={"blackAlpha"} variant={'solid'}
            size={'sm'}
            mr={4}>
              <Link style={{width: "100%"}} to={props.homebtn ? "/" : "/profile"}>{props.homebtn ? "Home" : "Profile"}</Link>
          </Button>
        </Flex>
      </Flex>
    </Box>
    <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Post a new post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input onChange={(e) => setitle(e.target.value)} ref={initialRef} placeholder='Title' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Descreption</FormLabel>
              <Textarea onChange={(e) => setdescreption(e.target.value)} placeholder='Your post descreption' />
            </FormControl>
            <FormControl>
              {
                file ? (
                  <PostImageContainer>
                    <PostImage src={file} />
                    <RemovePostImgae onClick={() => setfile(null)} />
                  </PostImageContainer>
                ) : (
                  <FileWrap>
                    <Text position="absolute">Image</Text>
                    <FileBtn type="file" onChange={(e) => getBase64(e.target.files[0])} accept="image/*" />
                  </FileWrap>
                )
              }
            </FormControl>
            
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => close()}>
              Post
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

  </>
  )
};

export default Navbar;
