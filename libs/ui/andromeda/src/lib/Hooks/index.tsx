import React from 'react';

import { AppMenuProvider } from '../organisms/AppMenu/context';

const AndromedaContextProvider: React.FC = ({ children }) => {
  return <AppMenuProvider>{children}</AppMenuProvider>;
};

export default AndromedaContextProvider;
