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
} from '@chakra-ui/react';

import { IMeeting } from '../../stores/Meetings';

interface IMeetingCardProps {
  meeting: IMeeting;
}

const MeetingCard: React.FC<IMeetingCardProps> = ({ meeting }) => {
  return (
    <Flex
      height={{ base: 80, md: 72 }}
      direction="column"
      justify="space-between"
      _hover={{ boxShadow: 'lg' }}
      padding={2}
    >
      <Heading as="h4">{meeting.title}</Heading>
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
      <Flex direction="row" justify="space-between">
        <Flex direction="row">
          <Box bg="gray.600" width={12} height={12} borderRadius="full" />
          <Box ml={2}>
            <Text>{meeting.user.name}</Text>
            <Text fontSize="md">{meeting.user.occupation}</Text>
          </Box>
        </Flex>
        <Box bg="gray.600" width={12} height={12} borderRadius="full" />
      </Flex>
    </Flex>
  );
};

export default MeetingCard;
