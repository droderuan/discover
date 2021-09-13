import { Drawer, DrawerProps, makeStyles, Box } from '@material-ui/core';
import IconButton, { IconButtonProps } from '../../atoms/IconButton';
import clsx from 'clsx';
import { useAppDrawer } from './context';
import Link from 'next/link';

export interface ItemProps extends IconButtonProps {
  path: string;
}

export interface AppDrawerProps extends DrawerProps {
  items: ItemProps[];
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
}));

const AppDrawer: React.FC<AppDrawerProps> = ({ items, ...props }) => {
  const classes = useStyles();
  const { open, toggleAppDrawer } = useAppDrawer();

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
          <Link href={item.path} key={item.label}>
            <IconButton onClick={toggleAppDrawer} horizontal={open} {...item} />
          </Link>
        ))}
      </div>
    </Drawer>
  );
};

export default AppDrawer;
