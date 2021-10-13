import { Profile } from '@discover/models/veritas';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useRouter } from 'next/dist/client/router';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import { createApi } from '../../utils';
import { auth as authenticate, AuthOptions } from '../services/auth.service';
import { getProfile } from '../services/getProfile.service';

interface signInOptions {
  auth: AuthOptions;
}

interface AuthContext {
  signInUrl?: string;
}

type AuthContextType = {
  serverError: boolean;
  profile: Profile | null;
  profileIsLoading: boolean;
  isAuthenticated: boolean;
  signIn(options?: signInOptions | string): Promise<void>;
  signOut(): Promise<void>;
  syncProfile: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider: React.FC<AuthContext> = ({
  signInUrl,
  children,
}) => {
  const router = useRouter();
  const [serverError, setServerError] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileIsLoading, setProfileIsLoading] = useState(false);
  const isAuthenticated = !!profile;

  const api = useMemo(() => createApi(), []);

  const redirectToLogin = useCallback(
    (redirectUrl = '/') => {
      if (!signInUrl) {
        throw new Error('Missing signInUrl');
      }
      router.push({
        pathname: signInUrl,
        query: { redirect_url: redirectUrl },
      });
    },
    [router, signInUrl]
  );

  const signIn = useCallback(
    async (options?: signInOptions | string): Promise<void> => {
      if (!options || typeof options === 'string') {
        redirectToLogin(options);
      } else {
        const redirectUrl = router.query.redirect_url as string;

        const token = await authenticate(options.auth);
        api.defaults.headers['Authorization'] = `Bearer ${token.access_token}`;

        const { data: profile } = await api.get('/genesis/profile');

        setCookie(null, 'token', token.access_token, {
          maxAge: 60 * 60 * 24 * 5,
          path: '/',
        });

        setProfile(profile);

        router.push(redirectUrl || '/');
      }
    },
    [api, redirectToLogin, router]
  );

  const signOut = useCallback(async () => {
    delete api.defaults.headers['Authorization'];
    destroyCookie(null, 'token');
    setProfile(null);
  }, [api.defaults.headers]);

  const syncProfile = useCallback(async () => {
    try {
      setProfileIsLoading(true);

      const profile = await getProfile(api);
      setProfileIsLoading(false);
      setProfile(profile);
    } catch (err) {
      const status = err.response.status;
      if (String(status)[0] === '5') {
        setServerError(true);
      }
    } finally {
      setProfileIsLoading(false);
    }
  }, [api]);

  useEffect(() => {
    const { token } = parseCookies();
    if (token) {
      api.defaults.headers['Authorization'] = `Bearer ${token}`;
      syncProfile();
    }
  }, [api.defaults.headers, syncProfile]);

  return (
    <AuthContext.Provider
      value={{
        serverError,
        profile,
        profileIsLoading,
        isAuthenticated,
        signIn,
        signOut,
        syncProfile,
      }}
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
