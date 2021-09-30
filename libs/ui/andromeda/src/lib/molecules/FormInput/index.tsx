import {
  FormControl,
  FormControlProps,
  FormHelperText,
  InputLabel,
  makeStyles,
  OutlinedInput,
  OutlinedInputProps,
} from '@material-ui/core';
import {
  Controller,
  Control,
  UseFormClearErrors,
  FieldValues,
} from 'react-hook-form';

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

export interface FormInputProps extends Omit<OutlinedInputProps, 'style'> {
  label: string;
  helperText?: string;
  errorText?: string;
  style?: FormControlProps['style'];
  name: string;
  clearErrors: UseFormClearErrors<FieldValues>;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  helperText,
  errorText,
  error,
  innerRef,
  style,
  name,
  clearErrors,
  ...props
}) => {
  const classes = useStyles();
  return (
    <FormControl
      variant="outlined"
      className={classes.inputWrapper}
      error={!!error}
      fullWidth
      style={style}
    >
      <InputLabel htmlFor={`${label} label`}>{label}</InputLabel>
      <OutlinedInput
        id={`${label} label`}
        ref={innerRef}
        aria-describedby={label || 'input text'}
        label={label}
        onFocus={() => clearErrors(name)}
        {...props}
      />
      {helperText && !errorText && (
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
  defaultValue,
  onChange: propOnChange,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ''}
      render={({ fieldState: { error }, field: { onChange, value } }) => (
        <FormInput
          label={label}
          onChange={(e) => {
            onChange(e);
            if (propOnChange) {
              propOnChange(e);
            }
          }}
          name={name}
          value={value}
          error={error}
          helperText={helperText}
          errorText={error && error.message}
          {...props}
        />
      )}
    />
  );
};
