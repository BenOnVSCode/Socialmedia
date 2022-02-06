
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { RegisterAccount } from '../actions/auth';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
const Register = () => {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    const dispatch = useDispatch()
    const [name, setname] = useState(null)
    const [username, setusername] = useState(null)
    const [password, setpassword] = useState(null)
    const [email, setemail] = useState(null)
    const [showPassword, setShowPassword] = useState(false);
    const Register = () => {
        dispatch(RegisterAccount(name, username, email, password))
    }
    return (
        <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontFamily={"Poppins"} fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
            
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              
                  <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input onChange={(e) => setname(e.target.value)} type="text" />
                  </FormControl>
            
              <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input onChange={(e) => setusername(e.target.value) } type="username" />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input onChange={(e) => setemail(e.target.value) } type="email" />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input onChange={(e) => setpassword(e.target.value)} type={showPassword ? 'text' : 'password'} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                    onClick={() => Register()}
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link to="/" style={{color: "#4299E1"}}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
  )
};

export default Register;
