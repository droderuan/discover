import React from 'react';
import { Link } from 'react-router-dom';

import { Flex, Spacer, Center, Heading } from '@chakra-ui/react';
import SearchBar from '../SearchBar';

const Header: React.FC = () => {
  return (
    <Flex
      direction="row"
      width="100%"
      position="sticky"
      top="0"
      h={{ base: '52px', md: '62px' }}
      bg="pink.600"
    >
      <Center ml={{ sm: 1, md: 8 }}>
        <Link to="/">
          <Heading as="h1" color="white">
            Discover
          </Heading>
        </Link>
      </Center>
      <Spacer />
      <Center>
        <SearchBar />
      </Center>
      <Spacer />
    </Flex>
  );
};

export default Header;
