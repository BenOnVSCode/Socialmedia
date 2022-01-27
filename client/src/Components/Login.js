import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { LoginToAccount } from '../actions/auth';
const Login = () => {
    const [show, setShow] = React.useState(false)
    const dispatch = useDispatch()
    const handleClick = () => setShow(!show)
    const [username, setusername] = React.useState(null)
    const [password, setpassword] = React.useState(null)
    const Login = () => {
        dispatch(LoginToAccount(username, password))
    }
  return (
    <Flex
    minH={'100vh'}
    align={'center'}
    justify={'center'}
    bg={useColorModeValue('gray.50', 'gray.800')}>
    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
      <Stack align={'center'}>
        <Heading fontFamily={"Poppins"} fontSize={'4xl'}>Sign in to your account</Heading>
      </Stack>
      <Box
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={8}>
        <Stack spacing={4}>
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input onChange={(e) => setusername(e.target.value)} type="username" />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input onChange={(e) => setpassword(e.target.value)}  type="password" />
          </FormControl>
          <Stack spacing={10}>
            <Button
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              onClick={() => Login()}
              >
              Sign in
            </Button>
          </Stack>
          <Stack spacing={10}>
            <Text align={'center'}>
                Do not have an account ? <Link to='/register' style={{color: "#4299E1"}}>Register</Link>
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  </Flex>
  )
};

export default Login;
