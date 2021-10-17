import { useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';
import { Typography } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import {
  AndromedaContextProvider,
  CoreLayout,
  MobileCoreLayout,
} from '@discover/ui/andromeda';
import { DefaultAppConfig, useDeviceStatus } from '@discover/ui/next';
import { AuthProvider } from '@discover/ui/next/auth';

import AuthLayout from '../layouts/AuthLayout';
import HookProvider from '../../hooks';

const AppConfig: React.FC = ({ children }) => {
  const { pathname } = useRouter();
  const { isMobile } = useDeviceStatus();

  if (isMobile === null) return null;

  return (
    <DefaultAppConfig>
      <AuthProvider signInUrl="/account/login">
        <AndromedaContextProvider>
          <HookProvider>
            {pathname.startsWith('/account') ? (
              <AuthLayout
                rightText={
                  <Typography variant="h1">
                    Join <br />
                    the best <br />
                    community
                  </Typography>
                }
              >
                {children}
              </AuthLayout>
            ) : isMobile ? (
              <MobileCoreLayout
                menuRoutes={[
                  {
                    icon: HomeIcon,
                    label: 'Home',
                    path: '/',
                  },
                  {
                    icon: LiveTvIcon,
                    label: 'meet',
                    path: '/meets/my-meets',
                  },
                  {
                    icon: AccountBoxIcon,
                    label: 'My Profile',
                    path: '/profile',
                  },
                  {
                    icon: SettingsIcon,
                    label: 'Settings',
                    path: '/settings',
                  },
                ]}
              >
                {children}
              </MobileCoreLayout>
            ) : (
              <CoreLayout
                menuRoutes={[
                  {
                    icon: HomeIcon,
                    label: 'home',
                    path: '/',
                    focused: true,
                  },
                  {
                    icon: LiveTvIcon,
                    label: 'meet',
                    path: '/meets/my-meets',
                  },
                  {
                    icon: AccountBoxIcon,
                    label: 'My Profile',
                    path: '/profile',
                  },
                  {
                    icon: AddToQueueIcon,
                    label: 'new meet',
                    path: '/',
                  },
                ]}
              >
                {children}
              </CoreLayout>
            )}
          </HookProvider>
        </AndromedaContextProvider>
      </AuthProvider>
    </DefaultAppConfig>
  );
};

export default AppConfig;
