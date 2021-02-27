import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Flex, Text } from '@chakra-ui/react';

import Header from '../../Components/Header';
import SideBar from '../../Components/SideBar';

import { IMeeting } from '../../stores/Meetings';
import Section from '../../Components/Section';
import PageTitle from '../../Components/PageTitle';

const Profile: React.FC = () => {
  const [meetings, setMeetings] = useState([] as IMeeting[]);

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
          <Section title="Account information">
            <Text>Profile</Text>
          </Section>
        </Box>
      </Flex>
    </Flex>
  );
};

export default observer(Profile);
