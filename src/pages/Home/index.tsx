import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import Api from '../../services/api';
import { useStore } from '../../hooks/Store';

import Header from '../../Components/Header';
import SideBar from '../../Components/SideBar';

import MeetingCard from '../../Components/MeetingCard';

import { IMeeting } from '../../stores/Meetings';

const Home: React.FC = () => {
  const [meetings, setMeetings] = useState([] as IMeeting[]);
  const { authStore, userStore } = useStore();

  useEffect(() => {
    Api.get('/meetings').then(response => {
      const responseMeetings = response.data as IMeeting[];
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
              <MeetingCard meeting={meeting} />
            ))}
          </SimpleGrid>
        </Box>
      </Flex>
    </Flex>
  );
};

export default observer(Home);
