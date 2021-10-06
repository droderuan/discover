import { useAuth } from '@discover/ui/next';
import React from 'react';

export const ProtectRoute = (children: React.FC | JSX.Element) => {
  const { isAuthenticated, signIn } = useAuth();
  if (!isAuthenticated) {
    return signIn();
  }
  return children;
};
