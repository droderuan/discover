import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import Client from '../../client/Client';

import Header from '../../Components/Header';
import SideBar from '../../Components/SideBar';

import HomeMeetingCard from '../../Components/HomeMeetingCard';

import { IMeeting } from '../../stores/Meetings';

const Home: React.FC = () => {
  const [meetings, setMeetings] = useState([] as IMeeting[]);

  useEffect(() => {
    const { meetingClient } = Client;

    meetingClient.listAllMeeting().then(responseMeetings => {
      setMeetings(responseMeetings);
    });
  }, [setMeetings]);

  return (
    <Flex direction="column" height="100vh">
      <Header />
      <Flex direction="row" height="100%">
        <Box>
          <SideBar />
        </Box>
        <Box width="100%" margin={{ base: 4, md: 8 }}>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} gap={4}>
            {meetings.map(meeting => (
              <HomeMeetingCard meeting={meeting} />
            ))}
          </SimpleGrid>
        </Box>
      </Flex>
    </Flex>
  );
};

export default observer(Home);
