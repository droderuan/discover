import React, { createContext, useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import User from '../stores/User';

interface IAuthContextData {
  user: User;
}

interface IAuthState {
  user: User;
  token: string;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider: React.FC = observer(({ children }) => {
  const [authState, setAuthState] = useState<IAuthState>(
    () => ({} as IAuthState),
  );

  return (
    <AuthContext.Provider value={{ user: authState.user }}>
      {children}
    </AuthContext.Provider>
  );
});

export function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('Auth context must be used within AuthProvider');
  }

  return context;
}
