import { Center, Heading, Spinner, Text } from '@chakra-ui/react';
import {
  Button,
  FormControl,
  Flex,
  Input,
  Stack,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react';
import { PinInput, PinInputField } from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { verify } from '../redux/actions/auth';

export default function VerifyEmail() {
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.auth)
    const {email} = useParams();
    const [code, setCode] = useState("")
    return (
        <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack
            spacing={4}
            w={'full'}
            maxW={'sm'}
            bg={useColorModeValue('white', 'gray.700')}
            rounded={'xl'}
            boxShadow={'lg'}
            p={6}
            my={10}>
            <Center>
            <Text lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                Verify your Email
            </Text>
            </Center>
            <Center
            fontSize={{ base: 'sm', sm: 'md' }}
            color={useColorModeValue('gray.800', 'gray.400')}>
            We have sent code to your email
            </Center>
            <Center
            fontSize={{ base: 'sm', sm: 'md' }}
            fontWeight="bold"
            color={useColorModeValue('gray.800', 'gray.400')}>
            {email}
            </Center>
            <FormControl>
            <Center>
                <HStack>
                <PinInput onComplete={(e) => setCode(e)}>
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                </PinInput>
                </HStack>
            </Center>
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
                        onClick={() => dispatch(verify({email, code}))}
                        colorScheme="blue"
                        >
                        Verify
                    </Button>
                )
              }
            
            </Stack>
        </Stack>
        </Flex>
    );
}