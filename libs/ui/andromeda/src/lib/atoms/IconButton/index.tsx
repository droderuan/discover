import {
  ButtonBase,
  SvgIconProps,
  Typography,
  ButtonProps,
  makeStyles,
  Box,
} from '@material-ui/core';
import clsx from 'clsx';
import { forwardRef } from 'react';

const useStyles = makeStyles(() => ({
  button: {
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
  iconColor?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'disabled'
    | 'action'
    | 'error'
    | undefined;
  focused?: boolean;
  horizontal?: boolean;
}

const IconButton: React.FC<IconButtonProps> = forwardRef(
  (
    { label, focused, horizontal = false, icon: Icon, iconColor, ...props },
    _
  ) => {
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
          <Icon
            color={iconColor || 'inherit'}
            style={{ fontSize: props.size === 'large' ? 32 : 24 }}
          />
        </Box>
        {label && (
          <Typography
            color="inherit"
            variant="body1"
            style={{ fontWeight: 'bold', fontSize: 12 }}
          >
            {label}
          </Typography>
        )}
      </ButtonBase>
    );
  }
);

export default IconButton;
