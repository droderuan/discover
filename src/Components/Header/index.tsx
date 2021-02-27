import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Button,
  ButtonGroup,
  Flex,
  Grid,
  GridItem,
  Heading,
  LinkBox,
} from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../hooks/Store';

import SearchBar from '../SearchBar';

const Header: React.FC = () => {
  const { authStore } = useStore();

  return (
    <Flex
      align="center"
      justify="center"
      h={{ sm: 12, md: 16 }}
      paddingX={{ base: 4, md: 16 }}
      bg="pink.600"
    >
      <Grid
        width="100%"
        position="sticky"
        top="0"
        templateColumns="repeat(5, 1fr)"
        gap="2"
      >
        <GridItem colSpan={1}>
          <LinkBox as={RouterLink} to="/">
            <Flex h="100%" align="center">
              <Heading
                as="h1"
                fontSize={{ base: 'xl', sm: '3xl' }}
                color="white"
              >
                Discover
              </Heading>
            </Flex>
          </LinkBox>
        </GridItem>

        <GridItem align="center" justify="center" colSpan={3}>
          <SearchBar />
        </GridItem>

        <GridItem direction="row-reverse" colSpan={1}>
          {!authStore.authenticated && (
            <ButtonGroup spacing={6}>
              <LinkBox as={RouterLink} to="/accounts/login">
                <Button variant="solid">Login</Button>
              </LinkBox>
              <LinkBox
                as={RouterLink}
                to="/accounts/signup"
                display={{ base: 'none', md: 'block' }}
              >
                <Button colorScheme="blue">Sign up</Button>
              </LinkBox>
            </ButtonGroup>
          )}
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default observer(Header);
