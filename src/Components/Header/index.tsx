import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, ButtonGroup, Flex, Heading, LinkBox } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../hooks/Store';

import SearchBar from '../SearchBar';

const Header: React.FC = () => {
  const { authStore } = useStore();

  return (
    <Flex
      width="100%"
      position="sticky"
      top="0"
      h={{ base: 12, md: 16 }}
      paddingX={{ base: 10, md: 16 }}
      bg="pink.600"
    >
      <Flex flex={1} align="center">
        <LinkBox as={RouterLink} to="/">
          <Heading as="h1" color="white">
            Discover
          </Heading>
        </LinkBox>
      </Flex>
      <Flex flex={1} align="center" justify="center">
        <SearchBar />
      </Flex>
      <Flex flex={1} align="center" direction="row-reverse">
        {!authStore.authenticated && (
          <ButtonGroup spacing={6}>
            <LinkBox as={RouterLink} to="/accounts/login">
              <Button variant="solid">Login</Button>
            </LinkBox>
            <LinkBox as={RouterLink} to="/accounts/signup">
              <Button colorScheme="blue">Sign up</Button>
            </LinkBox>
          </ButtonGroup>
        )}
      </Flex>
    </Flex>
  );
};

export default observer(Header);
