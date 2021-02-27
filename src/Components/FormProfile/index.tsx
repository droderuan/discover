import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Flex, Heading, Stack, Text, useToast } from '@chakra-ui/react';
import PasswordRegex from '../../utils/passwordRegex';
import FormInput from '../FormInput';
import api from '../../services/api';

interface FormValuesProps {
  name: string;
  occupation: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const FormSignup: React.FC = () => {
  const [isLoading, setisLoading] = useState(false);
  const history = useHistory();
  const toast = useToast();

  const formValues = {
    name: '',
    occupation: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().max(20).required('Your name is required'),
    occupation: Yup.string().max(30).required('Type your occupation'),
    email: Yup.string()
      .required('Email is required')
      .email('Digital a valid email'),
    password: Yup.string()
      .matches(
        PasswordRegex.mediumRegex,
        'Needs at least: one character upper case, lower case and a number',
      )
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], `Password doesn't match`)
      .required('Password confirmation is required'),
  });

  const handleSubmit = useCallback(
    (values: FormValuesProps) => {
      setisLoading(true);
      const body = { ...values, id: values.name + Date.now() };
      try {
        api.post('/users', { ...body }).finally(() => setisLoading(false));

        toast({
          title: 'Account created',
          description: 'Now you are part of the family!',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        history.push('/accounts/login');
      } catch (err) {
        toast({
          title: 'Something went wrong',
          description: 'Please, wait a few seconds and try again',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    },
    [history, toast],
  );

  return (
    <Flex direction="column" width="100%" maxW="400px">
      <Heading as="h3" size="lg" mb={8} textAlign="center">
        Which kind of stone are you?
      </Heading>
      <Formik
        initialValues={formValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <Stack spacing={4}>
              <FormInput
                name="name"
                label="Name"
                helperText="Name to be shown in your profile"
              />
              <FormInput
                name="occupation"
                label="Occupation"
                helperText="This will be shown in your profile"
              />
              <FormInput name="email" label="Email" type="email" />
              <FormInput
                name="password"
                label="Password"
                type="password"
                helperText="Must contain one upper case, one lower case and one number"
              />
              <FormInput
                name="confirmPassword"
                label="Confirm password"
                type="password"
              />
              <Button
                mt={4}
                colorScheme="blue"
                type="submit"
                isLoading={isLoading}
              >
                Signup
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
      <Heading as="h3" size="lg" mt={8} textAlign="center">
        Because your beauty is "stonning"
      </Heading>
      <Text size="2xl" mt={6} textAlign="center">
        I hope you have sense of humor...
      </Text>
    </Flex>
  );
};

export default FormSignup;
