import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { Box, Center, Flex, Heading, Icon, Text, Link } from '@chakra-ui/react';
import { BsArrowLeftShort } from 'react-icons/bs';
import FormLogin from '../../Components/FormLogin';

const Login: React.FC = () => {
  return (
    <Flex direction="row" height="100%">
      <Box flex={1} backgroundColor="white">
        <Flex
          height="100%"
          direction="column"
          align="center"
          padding={{ base: 20, md: 40 }}
        >
          <FormLogin />
          <Center>
            <Link as={RouterLink} to="/" mt={16}>
              <Flex
                align="center"
                color="blackAlpha.700"
                transition="0.2s"
                _hover={{ color: 'blackAlpha.900' }}
              >
                <Icon width={8} height={8} as={BsArrowLeftShort} />
                <Text fontSize="xl">Home</Text>
              </Flex>
            </Link>
          </Center>
        </Flex>
      </Box>
      <Box
        height="100vh"
        flex={1}
        backgroundColor="pink.600"
        position="sticky"
        top="0"
        display={{ base: 'none', lg: 'block' }}
      >
        <Flex
          height="100%"
          align="center"
          justify="center"
          direction="column"
          padding={{ base: 2, md: 4 }}
        >
          <Heading
            as="h2"
            size="3xl"
            noOfLines={4}
            textColor="white"
            textAlign="center"
          >
            Discover what the people is doing for the community!
          </Heading>
        </Flex>
      </Box>
    </Flex>
  );
};

export default observer(Login);
