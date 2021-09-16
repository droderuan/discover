import React from 'react';

import { AsideMenuProvider } from '../organisms/AsideMenu/context';

const AndromedaContextProvider: React.FC = ({ children }) => {
  return <AsideMenuProvider>{children}</AsideMenuProvider>;
};

export default AndromedaContextProvider;
