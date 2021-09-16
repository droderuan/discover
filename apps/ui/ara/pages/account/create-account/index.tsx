import { FormInputControl, FormInput } from '@discover/ui-andromeda';
import { Typography, Button, makeStyles } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import { useForm } from 'react-hook-form';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '-20%',
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
  const { handleSubmit, control } = useForm();
  const onSubmit = (data: any) => console.log(data);
  const send = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(onSubmit)();
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
          Create your account in <br />
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
          <FormInputControl
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
