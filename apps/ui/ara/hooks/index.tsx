import React from 'react';
import { SnackbarProvider } from 'notistack';

import { ToastProvider } from './toast';

const HookProvider: React.FC = ({ children }) => {
  return (
    <SnackbarProvider>
      <ToastProvider>{children}</ToastProvider>
    </SnackbarProvider>
  );
};

export default HookProvider;
