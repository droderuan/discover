import { Box, BoxProps, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
}));

const WhiteBoard: React.FC<BoxProps> = ({ children }) => {
  const classes = useStyles();
  return <Box className={classes.container}>{children}</Box>;
};

export default WhiteBoard;
