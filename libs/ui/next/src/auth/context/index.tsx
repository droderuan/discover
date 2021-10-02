import { Profile } from '@discover/models/veritas';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import { createApi } from '../../utils';
import { auth as authenticate, AuthOptions } from '../services/auth.service';
import { getProfile } from '../services/getProfile.service';
import { useRouter } from 'next/dist/client/router';

interface signInOptions {
  auth: AuthOptions;
  redirectUrl?: string;
}

interface AuthContext {
  signInUrl?: string;
}

type AuthContextType = {
  profile: Profile | null;
  isAuthenticated: boolean;
  signIn(options?: signInOptions): Promise<void>;
  signOut(): Promise<void>;
  syncProfile: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider: React.FC<AuthContext> = ({
  signInUrl,
  children,
}) => {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);

  const isAuthenticated = !!profile;

  const api = createApi();

  useEffect(() => {
    const { token } = parseCookies();
    if (token) {
      api.defaults.headers['Authorization'] = `Bearer ${token}`;
      syncProfile();
    }
  }, []);

  const redirectToLogin = useCallback(() => {
    if (!signInUrl) {
      throw new Error('Missing signInUrl');
    }
    router.push(signInUrl);
  }, []);

  const signIn = useCallback(async (options?: signInOptions): Promise<void> => {
    if (!options) {
      redirectToLogin();
    } else {
      const token = await authenticate(options.auth);
      api.defaults.headers['Authorization'] = `Bearer ${token.access_token}`;

      const { data: profile } = await api.get('/genesis/profile');

      setCookie(null, 'token', token.access_token, {
        maxAge: 60,
        path: '/',
      });

      setProfile(profile);

      if (options.redirectUrl) {
        router.push(options.redirectUrl);
      }
    }
  }, []);

  const signOut = useCallback(async () => {
    delete api.defaults.headers['Authorization'];
    destroyCookie(null, 'token');
    setProfile(null);
  }, []);

  const syncProfile = useCallback(async () => {
    const profile = await getProfile(api);

    setProfile(profile);
  }, []);

  return (
    <AuthContext.Provider
      value={{ profile, isAuthenticated, signIn, signOut, syncProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};
