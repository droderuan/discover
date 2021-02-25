import * as React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import HookProvider from './hooks';

import Routes from './routes';

export const App: React.FC = () => (
  <ChakraProvider theme={theme}>
    <HookProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </HookProvider>
  </ChakraProvider>
);
