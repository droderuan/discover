import { Box, BoxProps, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '16px 24px 0px',
    width: '100%',
    flex: 1,
  },
}));

const Content: React.FC<BoxProps> = ({ children }) => {
  const classes = useStyles();
  return <Box className={classes.container}>{children}</Box>;
};

export default Content;
