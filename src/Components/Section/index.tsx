import React from 'react';
import { Box, Divider, Flex, Heading } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

interface ISection {
  title: string;
}

const Section: React.FC<ISection> = ({ title, children }) => {
  return (
    <Flex direction="column" width="100%">
      <Heading as="h3" mb={2} size="md">
        {title}
      </Heading>
      <Divider />
      <Box mt={4}>{children}</Box>
    </Flex>
  );
};

export default observer(Section);
