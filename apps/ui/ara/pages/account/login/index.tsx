import { FormInputControl, FormInput } from '@discover/ui-andromeda';
import { Typography, Button, makeStyles } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { FaTwitch } from 'react-icons/fa';
import Link from 'next/link';

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

export function Login() {
  const classes = useStyles();
  const { handleSubmit, reset, control } = useForm();
  const onSubmit = (data: any) => console.log(data);
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
          Sign in on <br />{' '}
          <b style={{ fontSize: 48, textAlign: 'center', marginBottom: 55 }}>
            Discover
          </b>
        </Typography>
        <form onSubmit={send} className={classes.formContainer}>
          <FormInputControl control={control} name="email" label="E-mail" />
          <FormInputControl
            type="password"
            control={control}
            name="password"
            label="Password"
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
