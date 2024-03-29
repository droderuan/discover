import {
  Drawer,
  DrawerProps,
  makeStyles,
  Box,
  BottomNavigation,
  BottomNavigationAction,
} from '@material-ui/core';
import clsx from 'clsx';
import { useAppMenu } from './context';
import Link from 'next/link';

import IconButton, { IconButtonProps } from '../../atoms/IconButton';
import { useEffect, useState } from 'react';

export interface AsideItemProps extends IconButtonProps {
  path: string;
}

export interface AppMenuProps extends DrawerProps {
  items: AsideItemProps[];
}

const drawerWidth = 240;
const drawerMinWidth = 72;

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundColor: theme.palette.primary.main,
  },
  drawer: {
    paddingTop: 56,
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    minWidth: drawerMinWidth,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 64,
    width: drawerMinWidth,
  },
  button: {
    width: 72,
    height: 72,
    padding: '14px 20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  }
}));

const AppMenu: React.FC<AppMenuProps> = ({ items, ...props }) => {
  const classes = useStyles();
  const { open, toggleAppMenu } = useAppMenu();

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx(classes.background, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
      {...props}
    >
      <div className={classes.buttonContainer}>
        {items.map((item) => (
          <div className={classes.button}>

          <Link href={item.path} key={item.label}>
            <IconButton onClick={toggleAppMenu} horizontal={open} {...item} />
          </Link>
          </div>
        ))}
      </div>
    </Drawer>
  );
};

export default AppMenu;
