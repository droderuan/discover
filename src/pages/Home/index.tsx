import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Flex, SimpleGrid, Stack } from '@chakra-ui/react';
import Api from '../../services/api';

import Header from '../../Components/Header';
import SideBar from '../../Components/SideBar';

import MeetingCard from '../../Components/MeetingCard';

import { IMeeting } from '../../stores/Meetings';

const Home: React.FC = () => {
  const [meetings, setMeetings] = useState([] as IMeeting[]);

  useEffect(() => {
    Api.get('/meetings').then(response => {
      const responseMeetings = response.data as IMeeting[];
      setMeetings(responseMeetings);
    });
  }, [setMeetings]);

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
          marginX={{ base: 4, md: 8, xl: 'auto' }}
          overflow="auto"
        >
          <Stack spacing={4} mt={8}>
            {meetings.map(meeting => (
              <MeetingCard meeting={meeting} />
            ))}
          </Stack>
        </Box>
      </Flex>
    </Flex>
  );
};

export default observer(Home);
