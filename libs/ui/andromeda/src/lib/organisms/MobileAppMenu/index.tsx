import {
  makeStyles,
  BottomNavigation,
  BottomNavigationProps,
  BottomNavigationAction,
  SvgIconProps,
} from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';
import { useCallback, useEffect, useState } from 'react';

export interface ItemsAppMenuProps {
  label: string;
  path: string;
  icon: React.ComponentType<SvgIconProps>;
}

export interface MobileAppMenuProps extends BottomNavigationProps {
  items: ItemsAppMenuProps[];
}

const useStyles = makeStyles((theme) => ({
  mobileMenuWrapper: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    zIndex: theme.zIndex.appBar,
  },
}));

const MobileAppMenu: React.FC<MobileAppMenuProps> = ({ items, ...props }) => {
  const classes = useStyles();
  const { pathname, push } = useRouter();

  const getFirstPath = useCallback(
    () => pathname.split('/').slice(0, 2).join('/'),
    [pathname]
  );

  const [currentPath, setCurrentPath] = useState(getFirstPath());

  useEffect(() => {
    setCurrentPath(getFirstPath());
  }, [getFirstPath]);

  const pushToPath = useCallback(
    (path: string) => {
      push(path);
    },
    [push]
  );

  return (
    <div className={classes.mobileMenuWrapper}>
      <BottomNavigation
        showLabels={items.length <= 3}
        value={currentPath}
        onChange={(_, newValue) => pushToPath(newValue)}
      >
        {items.map(({ icon: Icon, ...item }) => (
          <BottomNavigationAction
            key={item.label}
            value={item.path}
            label={item.label}
            icon={<Icon />}
          />
        ))}
      </BottomNavigation>
    </div>
  );
};

export default MobileAppMenu;
