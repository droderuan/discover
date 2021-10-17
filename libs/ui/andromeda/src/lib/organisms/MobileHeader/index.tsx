import {
  AppBar,
  AppBarProps,
  Grid,
  Typography,
  makeStyles,
  alpha,
  InputBase,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '../../atoms/Button';
import IconButton from '../../atoms/IconButton';
import { useAppMenu } from '../../organisms/AppMenu/context';
import { forwardRef, useCallback } from 'react';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { useDeviceStatus } from '@discover/ui/next';

const useStyles = makeStyles((theme) => ({
  appBarContainer: {
    // zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: {
    ...theme.mixins.toolbar,
    padding: 0,
  },
  leftMenu: {
    display: 'flex',
    alignItems: 'center',
  },
  centerMenu: {
    display: 'flex',
    alignItem: 'center',
    justifyContent: 'center',
  },
  rightMenu: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      paddingRight: 72,
    },
    [theme.breakpoints.down('md')]: {
      paddingRight: 48,
    },
    [theme.breakpoints.down('sm')]: {
      paddingRight: theme.spacing(2),
    },
  },
  menuButtom: {
    width: 72,
    display: 'flex',
    alignItem: 'center',
    justifyContent: 'center',
  },
  platformNameContainer: {
    alignItems: 'flex-start',
    cursor: 'pointer',
  },
  platformName: {
    fontSize: 28,
    fontWeight: 500,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  hideRightMenu: {
    // [theme.breakpoints.down('sm')]: {
    //   visibility: 'hidden',
    // },
    // [theme.breakpoints.down('xs')]: {
    //   display: 'none',
    // },
  },
  searchInput: {
    display: 'flex',
    position: 'relative',
    width: '100%',
    maxWidth: 800,
  },
  inputRoot: {
    width: '100%',
    color: 'inherit',
  },
  input: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    transition: theme.transitions.create('width'),
    backgroundColor: alpha(theme.palette.grey[400], 0.45),
    '&:hover': {
      backgroundColor: alpha(theme.palette.grey[400], 0.7),
    },
    paddingLeft: theme.spacing(1),
    width: '100%',
  },
}));

const MobileHeaderbar: React.FC<AppBarProps> = forwardRef((props, ref) => {
  const classes = useStyles();
  const theme = useTheme();
  const { toggleAppMenu } = useAppMenu();
  const { isMobile } = useDeviceStatus();
  const smallArea = useMediaQuery(theme.breakpoints.down('xs'), {
    noSsr: true,
  });

  const router = useRouter();

  const handleCreateMeet = useCallback(() => {
    router.push('/meet/create');
  }, [router]);

  return (
    <AppBar color="default" ref={ref} {...props}>
      <Toolbar className={classes.toolbar}>
        <Grid container direction="row" alignItems="center">
          <Grid item xs={2} sm={3} md={3}>
            <div className={classes.leftMenu}>
              {!isMobile && (
                <div className={classes.menuButtom}>
                  <IconButton
                    onClick={toggleAppMenu}
                    style={{ paddingLeft: 0, paddingRight: 0, opacity: 1 }}
                    color="primary"
                    iconColor="primary"
                    icon={MenuIcon}
                  />
                </div>
              )}
              <div className={classes.platformNameContainer}>
                <Link href="/" passHref as="">
                  <Typography component="h1" className={classes.platformName}>
                    Discover
                  </Typography>
                </Link>
              </div>
            </div>
          </Grid>

          <Grid item xs={7} sm={6} md={6}>
            <div className={classes.centerMenu}>
              <div className={classes.searchInput}>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.input,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
                <Button
                  color="primary"
                  variant="contained"
                  style={{ borderRadius: '0', boxShadow: 'none' }}
                >
                  <SearchIcon />
                </Button>
              </div>
            </div>
          </Grid>
          <Grid item xs={3} sm={3} md={3} className={classes.hideRightMenu}>
            <div className={classes.rightMenu}>
              {isMobile || smallArea ? (
                <IconButton
                  onClick={handleCreateMeet}
                  color="primary"
                  iconColor="primary"
                  icon={AddCircleIcon}
                  size="large"
                  style={{ opacity: 1 }}
                />
              ) : (
                <Button
                  onClick={handleCreateMeet}
                  variant="contained"
                  color="primary"
                >
                  Create meet
                </Button>
              )}
            </div>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
});

export default MobileHeaderbar;
