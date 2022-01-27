import { Flex } from '@chakra-ui/react';
import React from 'react';
import Navbar from './Navbar';
import Posts from './Posts';

const Home = () => {
  return (
    <Flex flexDirection={"column"}>
      <Navbar />
      <Posts />
    </Flex>
  )
};

export default Home;
