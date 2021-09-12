import React from 'react';

import { AppDrawerProvider } from '../organisms/AppDrawer/context';

const AndromedaContextProvider: React.FC = ({ children }) => {
  return <AppDrawerProvider>{children}</AppDrawerProvider>;
};

export default AndromedaContextProvider;
