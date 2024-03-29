import {
  AppBar,
  Grid,
  Typography,
  IconButton,
  makeStyles,
  alpha,
  InputBase,
  Toolbar,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { useAppMenu, Button } from '@discover/ui/andromeda';
import { useCallback } from 'react';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
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

const Headerbar: React.FC = () => {
  const classes = useStyles();
  const { toggleAppMenu } = useAppMenu();
  const router = useRouter();

  const handleCreateMeet = useCallback(() => {
    router.push('/meet/create');
  }, [router]);

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
              onClick={toggleAppMenu}
              style={{ paddingLeft: 0, paddingRight: 0 }}
              color="primary"
            >
              <MenuIcon />
            </IconButton>

            <Link href="/" passHref as="">
              <Typography
                variant="h1"
                style={{
                  marginLeft: 24,
                  fontSize: 32,
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
                className={classes.hidePlatformName}
              >
                Discover
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={10} sm={7} md={5}>
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
