import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Button, Flex, Image, Stack, Text } from '@chakra-ui/react';
import { useStore } from '../../hooks/Store';

import Header from '../../Components/Header';
import SideBar from '../../Components/SideBar';
import Section from '../../Components/Section';
import PageTitle from '../../Components/PageTitle';

const Profile: React.FC = () => {
  const { userStore } = useStore();

  return (
    <Flex direction="column" height="100%">
      <Header />
      <Flex direction="row" height="100%">
        <Box>
          <SideBar />
        </Box>
        <Box
          width="100%"
          maxW="1024px"
          pt={8}
          marginX={{ base: 4, md: 8, xl: 'auto' }}
          overflow="auto"
        >
          <PageTitle title="Profile" />
          <Stack spacing={10}>
            <Section title="Profile image">
              <Flex align="center">
                <Image
                  bg="gray.600"
                  name={userStore.name}
                  boxSize={{ base: 40, md: 56 }}
                  src={userStore.profile_url}
                  borderRadius="full"
                  mr={10}
                />
                <Stack spacing={4}>
                  <Box>
                    <Button variant="solid" colorScheme="blue">
                      Change Profile Image
                    </Button>
                  </Box>
                  <Text noOfLines={4}>
                    Change your image profile. The image format: JPEG, PNG and
                    not exceds 10mb
                  </Text>
                </Stack>
              </Flex>
            </Section>

            <Section title="Account information">
              <Text>Profile</Text>
            </Section>
          </Stack>
        </Box>
      </Flex>
    </Flex>
  );
};

export default observer(Profile);
