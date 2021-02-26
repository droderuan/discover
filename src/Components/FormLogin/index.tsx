import React, { useCallback, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Flex,
  Heading,
  Stack,
  Divider,
  Link,
  Center,
  Text,
  useToast,
} from '@chakra-ui/react';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useStore } from '../../hooks/Store';
import FormInput from '../FormInput';

interface FormValuesProps {
  email: string;
  password: string;
}

const FormLogin: React.FC = () => {
  const { authStore } = useStore();
  const [isLoading, setisLoading] = useState(false);
  const toast = useToast();

  const formValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Digital a valid email'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = useCallback(
    ({ email, password }: FormValuesProps) => {
      setisLoading(true);
      try {
        authStore.login({ email, password }).finally(() => setisLoading(false));
        toast({
          title: 'Success',
          description: 'Redirecting you to home',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } catch (err) {
        toast({
          title: 'Something went wrong',
          description: 'Please, verify the email and your password',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    },
    [authStore, toast],
  );

  return (
    <Flex direction="column" width="100%" maxW="400px">
      <Heading as="h3" size="lg" mb={8} textAlign="center">
        Login
      </Heading>
      <Formik
        initialValues={formValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <Stack spacing={4}>
              <FormInput name="email" label="Email" type="email" />
              <FormInput name="password" label="Password" type="password" />
              <Button
                mt={4}
                colorScheme="blue"
                type="submit"
                isLoading={isLoading}
              >
                Login
              </Button>
              <Text textAlign="center">Or sign in with</Text>
              <Button colorScheme="facebook" leftIcon={<FaFacebook />}>
                Continue with Facebook
              </Button>
              <Button
                colorScheme="white"
                color="blackAlpha.800"
                leftIcon={<FcGoogle />}
                type="submit"
              >
                Continue with Google
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
      <Divider mt={4} />
      <Center>
        <Link as={RouterLink} to="/accounts/signup" textAlign="center" mt={4}>
          Create Account
        </Link>
      </Center>
    </Flex>
  );
};

export default observer(FormLogin);
