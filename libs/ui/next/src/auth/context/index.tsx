import { Profile } from '@discover/models/veritas';
import { createContext, useEffect, useState } from 'react';
import { auth as authenticate, AuthOptions } from '../services/auth.service';
import { getProfile } from '../services/getProfile.service';

interface SignInParams {
  authOptions: AuthOptions;
}

type AuthContextType = {
  profile: Profile | null;
  isAuthenticated: boolean;
  signIn: (data: SignInParams) => Promise<void>;
  syncProfile: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider: React.FC = ({ children }) => {
  const [profile, setProfile] = useState<Profile | null>(null);

  const isAuthenticated = !!profile;

  const signIn = async ({ authOptions }: SignInParams) => {
    const auth = await authenticate(authOptions);

    setProfile(auth.profile);
  };

  const syncProfile = async () => {
    const profile = await getProfile('token');

    setProfile(profile);
  };

  return (
    <AuthContext.Provider
      value={{ profile, isAuthenticated, signIn, syncProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};
