import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

interface IPageTitle {
  title: string;
}

const PageTitle: React.FC<IPageTitle> = ({ title }) => {
  return (
    <Box mb={4}>
      <Heading>{title}</Heading>
    </Box>
  );
};

export default PageTitle;
