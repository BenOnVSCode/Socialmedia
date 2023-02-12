import {
    Button,
    FormControl,
    Flex,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue,
    Spinner,
  } from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendRecoveryLink } from '../redux/actions/auth';
  
  
export default function ForgotPasswordForm() {
  const [email, setemail] = useState("")
  const dispatch = useDispatch()
  const { loading } = useSelector(state => state.auth)
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Text lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Forgot your password?
        </Text>
        <Text
          fontSize={{ base: 'sm', sm: 'md' }}
          color={useColorModeValue('gray.800', 'gray.400')}>
          You&apos;ll get an email with a reset link
        </Text>
        <FormControl id="email">
          <Input
            onChange={(e) => setemail(e.target.value)}
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
          />
        </FormControl>
        <Stack spacing={6}>
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
                    color={'white'}
                    onClick={() => dispatch(sendRecoveryLink({email}))}
                    colorScheme="blue"
                    >
                    Request Reset
                  </Button>
                )
              }
          
        </Stack>
      </Stack>
    </Flex>
  );
}