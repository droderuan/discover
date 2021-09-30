import React from 'react';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import Theme from './theme';

export const DefaultAppConfig: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
