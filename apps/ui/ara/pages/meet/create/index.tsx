import { useCallback, useState } from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { Chip, makeStyles, TextField, Typography } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import { Content } from '@discover/ui/andromeda';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { getAuthByContext, useAuth, useDeviceStatus } from '@discover/ui/next';
import clsx from 'clsx';

const useStyle = makeStyles((theme) => ({
  bannerWrapper: {
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
  division: {
    marginTop: theme.spacing(2),
  },
  inputTitle: {
    outline: 'none',
    border: 'none',
    backgroundColor: 'transparent',
    ...theme.typography.h4,
    width: '100%',
    transition: 'border-width 600ms',
    '&:focus': {
      borderBottom: `1px solid ${theme.palette.primary.main}`,
    },
  },
  mobileInputTitle: {
    ...theme.typography.h5,
  },
  chipWrapper: {
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap',
    marginTop: theme.spacing(1)
  },
  chip: {
    marginBottom: theme.spacing(0.5),
    marginRight: theme.spacing(1),
    '&:last-child': {
      marginRight: 0,
    },
  },
  newChipInput: {
    outline: 'none',
    border: 'none',
    backgroundColor: 'transparent',
    padding: 0,
  },
  descriptiontextArea: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  scheduleText: {
    marginTop: theme.spacing(1),
  },
}));

export function Index() {
  const { profile, isAuthenticated, signIn, signOut } = useAuth();
  const classes = useStyle();
  const { isMobile } = useDeviceStatus();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [addingChip, setAddingChip] = useState(false);
  const [newChip, setNewChip] = useState('');
  const [chips, setChips] = useState([
    'NodeJs',
    'Incentive.me',
    'Dev',
    'Startup',
  ]);

  const abortNewChip = useCallback(() => {
    setAddingChip(false);
    setNewChip('');
  }, []);

  const addChip = useCallback(
    (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
      e.preventDefault();

      const chipAlreadyAdded = chips.includes(newChip);
      if (!(newChip.length <= 0) && !chipAlreadyAdded) {
        setChips((oldChips) => [...oldChips, newChip]);
        abortNewChip();
      }
    },
    [abortNewChip, chips, newChip]
  );

  const removeChip = useCallback((value: string) => {
    setChips((oldChips) => oldChips.filter((chipValue) => chipValue !== value));
  }, []);

  const handleChangeTitle = useCallback((value) => {
    setTitle(value);
  }, []);

  const handleChangeDescription = useCallback((value) => {
    setDescription(value);
  }, []);

  return (
    <Content>
      <div className={classes.bannerWrapper}>
        <Image
          layout="fill"
          src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
          alt="Meet banner"
        />
      </div>
      <div className={classes.wrapper}>
        <div className={classes.meetContent}>
          <div className={classes.division}>
            <input
              className={clsx({
                [classes.inputTitle]: true,
                [classes.mobileInputTitle]: isMobile,
              })}
              value={title}
              placeholder="Meet title"
              type="text"
              onChange={(e) => handleChangeTitle(e.currentTarget.value)}
            />
          </div>
          <div className={classes.division}>
            <TextField
              className={classes.descriptiontextArea}
              id="outlined-multiline-flexible"
              multiline
              label="Description"
              variant="outlined"
              minRows={10}
              maxRows={10}
              value={description}
              onChange={(e) => handleChangeDescription(e.currentTarget.value)}
            />
            <Typography variant="subtitle2" className={classes.scheduleText}>
              Every thursday, at 7pm
            </Typography>
          </div>
          <div className={classes.division}>
            <Typography component="span" variant="h6">
              Tags
            </Typography>
            <Typography variant="subtitle1">
              Tags will help people to find your meet, so try to add tags which
              can be related to the meet.
            </Typography>
            <div className={classes.chipWrapper}>
              {chips.map((chip) => (
                <Chip
                  className={classes.chip}
                  key={chip}
                  label={chip}
                  color="primary"
                  onDelete={() => removeChip(chip)}
                />
              ))}
              <Chip
                className={classes.chip}
                label={
                  addingChip ? (
                    <input
                      className={classes.newChipInput}
                      placeholder="Name of the tag"
                      autoFocus
                      value={newChip}
                      size={
                        newChip.length < 10 ? 10 : (newChip.length / 10) * 8
                      }
                      onBlur={abortNewChip}
                      onChange={(e) => setNewChip(e.currentTarget.value)}
                    />
                  ) : (
                    'Add a tag'
                  )
                }
                variant="outlined"
                color="primary"
                onClick={() => setAddingChip(true)}
                onDelete={(e) => e.preventDefault()}
                deleteIcon={
                  addingChip ? (
                    <DoneIcon onMouseDown={(e) => addChip(e)} />
                  ) : (
                    <AddCircleIcon />
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>
    </Content>
  );
}

export default Index;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { auth, redirectToLogin } = getAuthByContext(ctx);
  if (!auth) {
    return redirectToLogin;
  }

  return {
    props: {},
  };
};
