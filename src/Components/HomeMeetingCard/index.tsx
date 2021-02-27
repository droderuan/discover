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
  Image,
} from '@chakra-ui/react';

import { IMeeting } from '../../stores/Meetings';

interface IHomeMeetingCard {
  meeting: IMeeting;
}

const HomeMeetingCard: React.FC<IHomeMeetingCard> = ({ meeting }) => {
  return (
    <Flex
      flex={1}
      height={{ base: 60, md: 56 }}
      justify="space-between"
      _hover={{ boxShadow: 'lg' }}
    >
      <Flex direction="column" justify="space-between" padding={2}>
        <Heading as="h4" size="lg">
          {meeting.title}
        </Heading>
        <Text noOfLines={{ base: 3 }}>{meeting.description}</Text>
        <Text fontWeight="bold" textAlign="center">
          {meeting.date.full_date}
        </Text>
        <Flex align="center" justify="space-between">
          <Wrap>
            {meeting.tags.map(tag => (
              <WrapItem>
                <Tag size="md" borderRadius="full" colorScheme="blue">
                  <TagLabel>{tag.name}</TagLabel>
                </Tag>
              </WrapItem>
            ))}
          </Wrap>
          <Image
            boxSize={{ base: 10, md: 12 }}
            mr={{ base: 1, md: 8 }}
            src={meeting.platform.icon}
          />
        </Flex>
      </Flex>
      <Flex
        flex={1}
        align="center"
        justify="center"
        direction="column"
        bg="gray.100"
        minW={40}
        borderRadius="md"
        padding={2}
      >
        <Image
          bg="gray.600"
          borderRadius="full"
          mb={4}
          boxSize={{ base: 16, md: 24 }}
          src={meeting.user.profile_url}
        />
        <Box pl={4}>
          <Text fontWeight="bold" textAlign="center">
            {meeting.user.name}
          </Text>
          <Text fontSize="md" textAlign="center">
            {meeting.user.occupation}
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default HomeMeetingCard;
