import React from 'react';
import {
  Box,
  Wrap,
  WrapItem,
  Flex,
  Heading,
  Tag,
  TagLabel,
  Text,
  Avatar,
  Image,
} from '@chakra-ui/react';

import { IMeeting } from '../../stores/Meetings';

interface IMeetingCardProps {
  meeting: IMeeting;
}

const MeetingCard: React.FC<IMeetingCardProps> = ({ meeting }) => {
  return (
    <Flex
      height={{ base: 80 }}
      direction="column"
      justify="space-between"
      _hover={{ boxShadow: 'lg' }}
      padding={2}
    >
      <Heading as="h4" size="lg">
        {meeting.title}
      </Heading>
      <Text noOfLines={{ base: 3 }}>{meeting.description}</Text>
      <Text fontWeight="bold" textAlign="center">
        {meeting.date.full_date}
      </Text>
      <Wrap width="100%">
        {meeting.tags.map(tag => (
          <WrapItem>
            <Tag size="md" borderRadius="full" colorScheme="blue">
              <TagLabel>{tag.name}</TagLabel>
            </Tag>
          </WrapItem>
        ))}
      </Wrap>
      <Flex direction="row" justify="space-between" align="center">
        <Flex direction="row" align="center">
          <Avatar
            bg="gray.600"
            name={meeting.user.name}
            size="lg"
            src={meeting.user.profile_url}
          />
          <Box ml={2}>
            <Text>{meeting.user.name}</Text>
            <Text fontSize="md">{meeting.user.occupation}</Text>
          </Box>
        </Flex>
        <Image boxSize={{ base: 8, md: 10 }} src={meeting.platform.icon} />
      </Flex>
    </Flex>
  );
};

export default MeetingCard;
