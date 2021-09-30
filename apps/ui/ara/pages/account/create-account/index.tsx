import { useCallback, useEffect, useMemo, useState } from 'react';
import swr from 'swr';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormInputControl, PasswordCompliance } from '@discover/ui/andromeda';
import { Typography, Button, makeStyles } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { api } from '../../../utils/genesisApi';
import { useToast } from '../../../hooks/toast';
import { useRouter } from 'next/dist/client/router';

interface createAccountForm {
  email: string;
  password: string;
  confirmPassword: string;
}

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '-20%',
    minWidth: 300,
    width: '30%',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  socialButton: {
    backgroundColor: theme.palette.background.paper,
  },
  otherLoginText: {
    display: 'inline-block',
    width: '100%',
    margin: '16px 0',
  },
  margin: {
    marginBottom: '8px',
  },
  twitchColor: {
    color: purple[500],
  },
}));

export function Login() {
  const classes = useStyles();
  const { addToast } = useToast();
  const router = useRouter();

  const [password, SetPassword] = useState('');
  const [passwordCompliance, SetPasswordCompliance] = useState(false);
  const [emailAlreadyUsed, SetEmailAlreadyUsed] = useState(false);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      email: yup.lazy(() => {
        if (emailAlreadyUsed) {
          return yup
            .string()
            .required()
            .test('already_exist', 'This e-mail already has an account', () => {
              return !emailAlreadyUsed;
            });
        }
        return yup.string().email('Provide a valide e-mail').required();
      }),
      password: yup
        .string()
        .min(8)
        .required('A password is required')
        .test(
          'passwor_compliance',
          'Please, complete the requirements below',
          () => passwordCompliance
        ),
      confirmPassword: yup
        .string()
        .oneOf(
          [yup.ref('password'), null],
          'Password confirmation does not match'
        ),
    });
  }, [emailAlreadyUsed, passwordCompliance]);

  const { handleSubmit, control, clearErrors, setError } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleCreateAccount = async (data: createAccountForm) => {
    try {
      await api.post(`/account`, data);
      addToast({
        type: 'success',
        message: 'Created account with success. Proceed with login.',
      });
      router.push('/account/login');
    } catch (err) {
      addToast({
        type: 'error',
        message: 'Something went wrong. Please wait a while and try again.',
      });
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(handleCreateAccount)();
  };

  const verifyEmail = async (email: string) => {
    try {
      const { data } = await api.get<{ exist: boolean }>(
        `/account/check-email/${email}`
      );
      if (data.exist) {
        setError('email', { message: 'This e-mail already has an account' });
      }
      SetEmailAlreadyUsed(data.exist);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={classes.container}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '24px',
          }}
        >
          <Link passHref href="/account/login">
            <Button
              type="submit"
              color="primary"
              startIcon={<ArrowBackIosIcon />}
            >
              Back
            </Button>
          </Link>
        </div>
        <Typography
          variant="h1"
          style={{ fontSize: 32, textAlign: 'center', marginBottom: 55 }}
        >
          Create your account on <br />
          <b style={{ fontSize: 48, textAlign: 'center', marginBottom: 55 }}>
            Discover
          </b>
        </Typography>
        <form onSubmit={onSubmit} className={classes.formContainer}>
          <FormInputControl
            clearErrors={clearErrors}
            control={control}
            name="email"
            label="E-mail"
            onBlur={(e) => verifyEmail(e.currentTarget.value)}
          />
          <FormInputControl
            clearErrors={clearErrors}
            type="password"
            control={control}
            name="password"
            label="Password"
            onChange={(e) => SetPassword(e.currentTarget.value)}
            style={{ marginBottom: 8 }}
            helperText="Provide a strong password"
          />
          <PasswordCompliance
            password={password}
            onComplianceChange={(value) => SetPasswordCompliance(value)}
          />
          <FormInputControl
            clearErrors={clearErrors}
            type="password"
            control={control}
            name="confirmPassword"
            label="Confirm password"
          />
          <Button type="submit" color="primary" variant="contained">
            Create Account
          </Button>
        </form>
      </div>
    </>
  );
}

export default Login;
