import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Center, Flex, Heading, Icon, Text, Link } from '@chakra-ui/react';
import { BsArrowLeftShort } from 'react-icons/bs';
import FormSignup from '../../Components/FormSignup';

const Signup: React.FC = () => {
  return (
    <Flex direction="row" height="100%">
      <Box
        height="100vh"
        flex={1}
        position="sticky"
        top="0"
        backgroundColor="pink.600"
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
            Hey
            <br />
            We were waiting for you!
          </Heading>
        </Flex>
      </Box>
      <Box flex={1} backgroundColor="white">
        <Flex
          height="100%"
          direction="column"
          align="center"
          padding={{ base: 20, md: 40 }}
        >
          <Center>
            <Link as={RouterLink} to="/accounts/login" mb={16}>
              <Flex
                align="center"
                color="blackAlpha.700"
                transition="0.2s"
                _hover={{ color: 'blackAlpha.900' }}
              >
                <Icon width={8} height={8} as={BsArrowLeftShort} />
                <Text fontSize="xl">Login</Text>
              </Flex>
            </Link>
          </Center>
          <FormSignup />
        </Flex>
      </Box>
    </Flex>
  );
};

export default Signup;
