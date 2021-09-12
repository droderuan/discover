import {
  ButtonBase,
  SvgIconProps,
  Typography,
  ButtonProps,
  makeStyles,
  Box,
} from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  button: {
    width: 72,
    height: 72,
    padding: '14px 20px',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  unFocused: {
    opacity: 0.7,
  },
  horizontal: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: '100%',
  },
  iconWrapperHorizontal: {
    marginRight: 24,
  },
}));

export interface IconButtonProps extends ButtonProps {
  label?: string;
  icon: React.ComponentType<SvgIconProps>;
  focused?: boolean;
  horizontal?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
  label,
  focused,
  horizontal = false,
  icon: Icon,
  ...props
}) => {
  const classes = useStyles();
  return (
    <ButtonBase
      className={clsx(classes.button, {
        [classes.unFocused]: focused !== null && !focused,
        [classes.horizontal]: horizontal && label,
      })}
      {...props}
    >
      <Box
        className={clsx({
          [classes.iconWrapperHorizontal]: horizontal && label,
        })}
      >
        <Icon color="inherit" style={{ fontSize: 24 }} />
      </Box>
      {label && (
        <Typography
          color="inherit"
          variant="body1"
          style={{ fontWeight: 'bold', fontSize: 14 }}
        >
          {label}
        </Typography>
      )}
    </ButtonBase>
  );
};

export default IconButton;
