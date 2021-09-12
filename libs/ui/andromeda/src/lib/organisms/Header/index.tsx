import {
  AppBar,
  Grid,
  Button,
  Typography,
  IconButton,
  makeStyles,
  alpha,
  InputBase,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { useAppDrawer } from '../AppDrawer/context';

const useStyles = makeStyles((theme) => ({
  appBarContainer: {
    left: 0,
    minWidth: 764,
    zIndex: theme.zIndex.drawer + 1,
  },
  searchBarContainer: {
    height: 56,
    display: 'flex',
    flex: 1,
    jutifyContent: 'center',
  },
  hiddenItem: {
    [theme.breakpoints.down('sm')]: {
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
    // [theme.breakpoints.down('sm')]: {
    //   width: 'auto',
    // },
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
  const classes = useStyles();
  const { toggleAppDrawer } = useAppDrawer();
  return (
    <AppBar className={classes.appBarContainer} color="default">
      <Grid container direction="row" alignItems="center" spacing={2}>
        <Grid item sm={2} md={1}>
          <IconButton
            onClick={toggleAppDrawer}
            color="primary"
            style={{ width: 72 }}
          >
            <MenuIcon />
          </IconButton>
        </Grid>

        <Grid item md={3} className={classes.hiddenItem}>
          <Typography variant="h1" style={{ fontSize: 32, fontWeight: 500 }}>
            Discover
          </Typography>
        </Grid>
        <Grid item sm={7} md={4}>
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
        <Grid item sm={3} md={4}>
          <div className={classes.rightMenu}>
            <Button variant="contained" color="primary">
              Create meet
            </Button>
          </div>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default Headerbar;
