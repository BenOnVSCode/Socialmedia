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
} from '@chakra-ui/react';   
import { AddIcon } from '@chakra-ui/icons';
import { addApost } from '../actions/posts';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
const Navbar = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef()
    const [title, setitle] = React.useState()
    const [descreption, setdescreption] = React.useState()
    const finalRef = React.useRef()
    const dispatch = useDispatch()

    const close = () => {
      dispatch(addApost(title, descreption))
      setTimeout(onClose, 1000)
    }
       
  return (
    <>
    <Box width={"100vw"} bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <HStack spacing={8} alignItems={'center'}>
          <Box fontWeight={"bolder"}>SM</Box>
        </HStack>
        <Flex alignItems={'center'}>
          {
            props.home ? (
              <Button colorScheme={"teal"} size={"sm"} mr="4">
                <Link style={{width: "100%"}} to="/"> Home</Link>
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
