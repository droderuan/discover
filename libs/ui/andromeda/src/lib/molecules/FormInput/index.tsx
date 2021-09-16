import {
  FormControl,
  FormHelperText,
  InputLabel,
  makeStyles,
  OutlinedInput,
  OutlinedInputProps,
} from '@material-ui/core';
import { Controller, Control } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  inputWrapper: {
    [theme.breakpoints.down('md')]: {
      marginBottom: 16,
    },
    [theme.breakpoints.up('md')]: {
      marginBottom: 24,
    },
  },
}));

export interface FormInputProps extends OutlinedInputProps {
  label: string;
  helperText?: string;
  errorText?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  helperText,
  errorText,
  error,
  innerRef,
  ...props
}) => {
  const classes = useStyles();

  return (
    <FormControl
      variant="outlined"
      className={classes.inputWrapper}
      error={!!error}
      fullWidth
    >
      <InputLabel htmlFor={`${label} label`}>{label}</InputLabel>
      <OutlinedInput
        id={`${label} label`}
        ref={innerRef}
        aria-describedby={label || 'input text'}
        label={label}
        {...props}
      />
      {helperText && (
        <FormHelperText id={`${helperText} text`}>{helperText}</FormHelperText>
      )}
      {!!errorText && (
        <FormHelperText error id={`${errorText} text`}>
          {errorText}
        </FormHelperText>
      )}
    </FormControl>
  );
};
export default FormInput;

export interface FormInputControl extends FormInputProps {
  name: string;
  /**
   * @typeParam Control object of the useForm from react-hook-form
   */
  control: Control;
  label: string;
  helperText?: string;
  errorText?: string;
  defaultValue?: string;
}

/**
 * This component needs to be used with react-hook-form lib
 */
export const FormInputControl: React.FC<FormInputControl> = ({
  name,
  control,
  label,
  helperText,
  errorText,
  defaultValue,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ''}
      render={({ field: { onChange, value } }) => (
        <FormInput
          label={label}
          onChange={onChange}
          value={value}
          helperText={helperText}
          errorText={errorText}
          {...props}
        />
      )}
    />
  );
};
