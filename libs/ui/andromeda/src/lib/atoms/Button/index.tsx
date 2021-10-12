import {
  Button as MaterialButton,
  ButtonProps,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    borderRadius: '0',
    boxShadow: 'none',
  },
}));

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  const classes = useStyles();
  return (
    <MaterialButton
      color="primary"
      variant="contained"
      className={classes.container}
      {...props}
    >
      {children}
    </MaterialButton>
  );
};

export default Button;
