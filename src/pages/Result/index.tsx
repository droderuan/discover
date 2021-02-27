import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Flex, Stack } from '@chakra-ui/react';
import Client from '../../client/Client';

import Header from '../../Components/Header';
import SideBar from '../../Components/SideBar';

import MeetingCard from '../../Components/MeetingCard';

import { IMeeting } from '../../stores/Meetings';

const Result: React.FC = () => {
  const [meetings, setMeetings] = useState([] as IMeeting[]);

  useEffect(() => {
    const { meetingClient } = Client;

    meetingClient.listAllMeeting().then(responseMeetings => {
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
          pt={8}
          marginX={{ base: 4, md: 8, xl: 'auto' }}
          overflow="auto"
        >
          <Stack spacing={4}>
            {meetings.map(meeting => (
              <MeetingCard meeting={meeting} />
            ))}
          </Stack>
        </Box>
      </Flex>
    </Flex>
  );
};

export default observer(Result);
