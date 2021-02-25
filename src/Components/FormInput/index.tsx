import {
  FormLabel,
  Input,
  InputProps,
  FormControl,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';
import React from 'react';
import { Field, FieldProps } from 'formik';

interface FormInputProps extends InputProps {
  name: string;
  label: string;
  helperText?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  helperText,
  ...props
}) => {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => (
        <FormControl
          id={name}
          isInvalid={!!form.errors[name] && !!form.touched[name]}
        >
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <Input {...field} id={name} {...props} />
          {helperText && <FormHelperText>{helperText}</FormHelperText>}
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export default FormInput;
