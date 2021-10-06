import { Content } from '@discover/ui/andromeda';
import { isAuthenticatedServer, useAuth } from '@discover/ui/next';
import { makeStyles, TextField, Typography } from '@material-ui/core';
import { GetServerSideProps } from 'next';
import { useCallback, useState } from 'react';

const useStyle = makeStyles((theme) => ({
  banner: {
    position: 'relative',
    height: 300,
    backgroundColor: '#a9a9a9',
    minWidth: `calc(100% + ${theme.spacing(6) + 1}px)`,
    marginLeft: `-${theme.spacing(3) + 1}px`,
    marginTop: `-${theme.spacing(2)}px`,
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flex: 1,
  },
  meetContent: {
    width: '100%',
    maxWidth: 744,
    [theme.breakpoints.down('md')]: {
      maxWidth: 550,
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: 350,
    },
  },
  inputTitle: {
    outline: 'none',
    border: 'none',
    backgroundColor: 'transparent',
    ...theme.typography.h4,
    transition: 'border-width 600ms',
    '&:focus': {
      borderBottom: `1px solid ${theme.palette.primary.main}`,
    },
  },
  descriptiontextArea: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  scheduleText: {
    marginTop: theme.spacing(1),
  },
  profileContent: {
    marginLeft: 128,
  },
}));

export function Index() {
  const { profile, isAuthenticated, signIn, signOut } = useAuth();
  const classes = useStyle();

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  const handleChangeTitle = useCallback((value) => {
    setTitle(value);
  }, []);

  const handleChangeDescription = useCallback((value) => {
    setDescription(value);
  }, []);

  return (
    <Content>
      <img className={classes.banner} />
      <div className={classes.wrapper}>
        <div className={classes.meetContent}>
          <div>
            <input
              className={classes.inputTitle}
              value={title}
              placeholder="Meet title"
              type="text"
              onChange={(e) => handleChangeTitle(e.currentTarget.value)}
            />
          </div>

          <div>
            <TextField
              className={classes.descriptiontextArea}
              id="outlined-multiline-flexible"
              multiline
              label="Description"
              variant="outlined"
              rows={10}
              maxRows={10}
              value={description}
              onChange={(e) => handleChangeDescription(e.currentTarget.value)}
            />
            <Typography variant="subtitle2" className={classes.scheduleText}>
              Every thursday, at 7pm
            </Typography>
          </div>
        </div>
        <div className={classes.profileContent}>
          <Typography>meu perfil</Typography>
        </div>
      </div>
    </Content>
  );
}

export default Index;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { auth, returnValue } = isAuthenticatedServer(ctx);
  if (!auth) {
    return returnValue;
  }

  return {
    props: {},
  };
};
