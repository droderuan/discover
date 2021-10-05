import { useAuth } from '@discover/ui/next';

export const ProtectRoute = ({ children }) => {
  const { isAuthenticated, signIn } = useAuth();
  if (!isAuthenticated) {
    return signIn();
  }
  return children;
};
