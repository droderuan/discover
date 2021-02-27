import React from 'react';
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Tooltip,
} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';

const SearchBar: React.FC = () => {
  return (
    <Box width={{ sm: '100%', md: '320px' }}>
      <InputGroup>
        <Input bg="white" placeholder="Busque por tecnologias" />
        <InputRightElement>
          <Tooltip label="Search">
            <Button bg="blue.400" borderRightRadius="md">
              <Search2Icon color="white" />
            </Button>
          </Tooltip>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};

export default SearchBar;
