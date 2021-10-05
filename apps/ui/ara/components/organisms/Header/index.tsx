import {
  AppBar,
  Grid,
  Button,
  Typography,
  IconButton,
  makeStyles,
  alpha,
  InputBase,
  Toolbar,
} from '@material-ui/core';
import { useAuth } from '@discover/ui/next';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { useAsideMenu } from '@discover/ui/andromeda';
import { useCallback } from 'react';
import { useRouter } from 'next/dist/client/router';
const useStyles = makeStyles((theme) => ({
  appBarContainer: {
    left: 0,
    zIndex: theme.zIndex.drawer + 1,
  },
  hidePlatformName: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  hideRightMenu: {
    [theme.breakpoints.down('sm')]: {
      visibility: 'hidden',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  rightMenu: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(1),
  },
  searchInput: {
    display: 'flex',
    position: 'relative',
    width: '100%',
  },
  inputRoot: {
    width: '100%',

    color: 'inherit',
  },
  inputInput: {
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

const Headerbar: React.FC = () => {
  const { isAuthenticated, signIn } = useAuth();
  const classes = useStyles();
  const { toggleAsideMenu } = useAsideMenu();
  const router = useRouter();

  const handleCreateMeet = useCallback(() => {
    if (!isAuthenticated) {
      return signIn('/meet/create');
    }
    router.push('/meet/create');
  }, []);

  return (
    <AppBar
      position="fixed"
      className={classes.appBarContainer}
      color="default"
    >
      <Toolbar style={{ padding: '0 24px' }}>
        <Grid spacing={1} container direction="row" alignItems="center">
          <Grid
            item
            xs={2}
            sm={4}
            md={3}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <IconButton
              onClick={toggleAsideMenu}
              style={{ paddingLeft: 0, paddingRight: 0 }}
              color="primary"
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h1"
              style={{ marginLeft: 24, fontSize: 32, fontWeight: 500 }}
              className={classes.hidePlatformName}
            >
              Discover
            </Typography>
          </Grid>
          <Grid item xs={10} sm={7} md={5}>
            <div className={classes.searchInput}>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
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
          </Grid>
          <Grid item sm={1} md={4} className={classes.hideRightMenu}>
            <div className={classes.rightMenu}>
              <Button
                onClick={handleCreateMeet}
                variant="contained"
                color="primary"
              >
                Create meet
              </Button>
            </div>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Headerbar;
