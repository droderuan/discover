import React from 'react';

import { StoreProvider } from './Store';

const HookProvider: React.FC = ({ children }) => {
  return <StoreProvider>{children}</StoreProvider>;
};

export default HookProvider;
