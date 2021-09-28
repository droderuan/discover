import { signIn } from 'next-auth/client';
import Link from 'next/link';
import * as yup from 'yup';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { FormInputControl } from '@discover/ui-andromeda';
import { Typography, Button, makeStyles } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import { FcGoogle } from 'react-icons/fc';
import { FaTwitch } from 'react-icons/fa';
import { yupResolver } from '@hookform/resolvers/yup';

const useStyles = makeStyles((theme) => ({
  container: {
    minWidth: 253,
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

interface loginForm {
  email: string;
  password: string;
}

const validationSchema = yup.object().shape({
  email: yup.string().email('Provide a valide e-mail').required(),
  password: yup.string().required('A password is required'),
});

export function Login() {
  const classes = useStyles();
  const { handleSubmit, control, clearErrors } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = (data: loginForm) => {
    try {
      signIn('credentials', {
        redirect: true,
        email: data.email,
        password: data.password,
        callbackUrl: `/`,
      });
    } catch (err) {
      alert('err');
    }
  };
  const send = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(onSubmit)();
  };
  return (
    <>
      <div className={classes.container}>
        <Typography
          variant="h1"
          style={{ fontSize: 32, textAlign: 'center', marginBottom: 55 }}
        >
          Sign in on <br />
          <b style={{ fontSize: 48, textAlign: 'center', marginBottom: 55 }}>
            Discover
          </b>
        </Typography>
        <form onSubmit={send} className={classes.formContainer}>
          <FormInputControl
            control={control}
            name="email"
            label="E-mail"
            clearErrors={clearErrors}
          />
          <FormInputControl
            type="password"
            control={control}
            name="password"
            label="Password"
            clearErrors={clearErrors}
          />

          <Button type="submit" color="primary" variant="contained">
            Login
          </Button>
        </form>
        <Link href="/account/create-account" passHref>
          <Button
            style={{ marginTop: '24px' }}
            type="submit"
            color="primary"
            fullWidth
          >
            Create Account
          </Button>
        </Link>
        <Typography
          className={classes.otherLoginText}
          variant="caption"
          align="center"
        >
          or
        </Typography>
        <Button
          className={clsx(classes.socialButton, classes.margin)}
          variant="contained"
          fullWidth
          startIcon={<FcGoogle />}
        >
          Sign in with Google
        </Button>
        <Button
          className={clsx(classes.socialButton, classes.margin)}
          variant="contained"
          fullWidth
          startIcon={<FaTwitch className={classes.twitchColor} />}
        >
          Sign in with Twitch
        </Button>
      </div>
    </>
  );
}

export default Login;
