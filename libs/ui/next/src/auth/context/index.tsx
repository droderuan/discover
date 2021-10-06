import { Profile } from '@discover/models/veritas';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/dist/client/router';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import { createApi } from '../../utils';
import { auth as authenticate, AuthOptions } from '../services/auth.service';
import { getProfile } from '../services/getProfile.service';
import { GetServerSidePropsContext } from 'next';

interface signInOptions {
  auth: AuthOptions;
}

interface AuthContext {
  signInUrl?: string;
}

type AuthContextType = {
  profile: Profile | null;
  isAuthenticated: boolean;
  hasCookie(ctx: GetServerSidePropsContext): boolean;
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
  const [profile, setProfile] = useState<Profile | null>(null);

  const isAuthenticated = !!profile;

  const api = createApi();

  const hasCookie = useCallback((ctx: GetServerSidePropsContext) => {
    const { token } = parseCookies(ctx);

    return !!token;
  }, []);

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

        if (redirectUrl) {
          router.push(redirectUrl);
        }
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
    const profile = await getProfile(api);

    setProfile(profile);
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
        profile,
        isAuthenticated,
        signIn,
        signOut,
        syncProfile,
        hasCookie,
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
