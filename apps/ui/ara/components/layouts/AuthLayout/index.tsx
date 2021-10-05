import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    height: '100vh',
  },
  asideLeft: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirectino: 'column',
    backgroundColor: theme.palette.background.paper,
  },
  asideRight: {
    height: '100%',
    flex: 1,
    backgroundColor: theme.palette.primary.main,
  },
  textWrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '65px',
    color: theme.palette.primary.contrastText,
  },
  hide: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
}));

export interface LogintemplateProps {
  rightText: JSX.Element;
}

const AuthLayout: React.FC<LogintemplateProps> = ({
  rightText: RightText,
  children,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <aside className={classes.asideLeft}>{children}</aside>
      <aside className={clsx(classes.asideRight, classes.hide)}>
        <div className={classes.textWrapper}>{RightText}</div>
      </aside>
    </div>
  );
};

export default AuthLayout;
