import { Box, BoxProps, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: '16px 24px',
  },
}));

const Content: React.FC<BoxProps> = ({ children }) => {
  const classes = useStyles();
  return <Box className={classes.container}>{children}</Box>;
};

export default Content;
