import { Box, BoxProps, makeStyles, Toolbar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    height: `100vh`,
  },
}));

const WhiteBoard: React.FC<BoxProps> = ({ children }) => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Toolbar />
      {children}
    </Box>
  );
};

export default WhiteBoard;
