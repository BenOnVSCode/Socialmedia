import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,

  Button,
  Heading,
  Text,
  useColorModeValue,
  Spinner,
} from '@chakra-ui/react';
import {useState} from "react"
import { useDispatch, useSelector } from 'react-redux';
import {Link} from "react-router-dom" 
import { signUp } from '../redux/actions/auth';
export default function Signup() {
  const [email, setemail] = useState("")
  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.auth)

  return (
    
    <Flex
    minH="100vh"
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Text textAlign="center" fontSize={'4xl'}>Create new account</Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
          <FormControl id="email">
              <FormLabel>Username</FormLabel>
              <Input onChange={(e) => setusername(e.target.value)} type="username" />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input onChange={(e) => setemail(e.target.value)} type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input onChange={(e) => setpassword(e.target.value)} type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Text to="/" as={Link} color={'blue.400'}>Already have an account?</Text >
              </Stack>
              
              {
                loading ? (
                  <Button
                    color={'white'}
                    colorScheme="blue"
                    isDisabled={true}
                    >
                    <Spinner colorScheme="white" />
                  </Button>
                  
                ) : (
                  <Button
                    onClick={() => dispatch(signUp({email, username, password}))}
                    colorScheme="blue"
                    >
                    Sign up
                  </Button>
                )
              }
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}