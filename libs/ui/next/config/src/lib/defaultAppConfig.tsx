import React from 'react';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { Session } from 'next-auth';
import Theme from './theme';

interface DefaultAppConfigProps {
  session?: Session;
}

export const DefaultAppConfig: React.FC<DefaultAppConfigProps> = ({
  session,
  children,
}) => {
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
