import { useEffect, useMemo } from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      marginBottom: 16,
    },
    [theme.breakpoints.up('md')]: {
      marginBottom: 24,
    },
  },
  rulesWrapper: {
    display: 'flex',
    flexDirection: 'column',
    '&>div': {
      marginRight: 4,
    },
  },
  notAchievedColor: {
    color: theme.palette.grey[400],
  },
  successColor: {
    color: theme.palette.success.main,
  },
}));

export interface PasswordComplianceProps {
  password: string;
  onComplianceChange: (value: boolean) => void;
}

const PasswordCompliance: React.FC<PasswordComplianceProps> = ({
  password,
  onComplianceChange,
}) => {
  const classes = useStyles();

  const passwordLengthMoreThan8 = useMemo(() => {
    return password.length > 8;
  }, [password]);

  const passwordHasCapitalLetter = useMemo(() => {
    const regex = new RegExp(/[A-Z]/g);
    return regex.test(password);
  }, [password]);

  const passwordHasLetter = useMemo(() => {
    const regex = new RegExp(/\w/g);
    return regex.test(password);
  }, [password]);

  const passwordHasNumber = useMemo(() => {
    const regex = new RegExp(/\d/g);
    return regex.test(password);
  }, [password]);

  const passwordHasSpecialCharacters = useMemo(() => {
    const regex = new RegExp(/[!@#$%&?*{}[\]\\/]/g);
    return regex.test(password);
  }, [password]);

  const rules = [
    [
      {
        name: 'Minimum 8 characters',
        referenceValue: passwordLengthMoreThan8,
      },
      {
        name: 'Capital character',
        referenceValue: passwordHasCapitalLetter,
      },
    ],
    [
      {
        name: 'One number',
        referenceValue: passwordHasNumber,
      },
      {
        name: 'Special character',
        referenceValue: passwordHasSpecialCharacters,
      },
    ],
  ];

  useEffect(() => {
    onComplianceChange(
      passwordLengthMoreThan8 &&
        passwordHasCapitalLetter &&
        passwordHasLetter &&
        passwordHasNumber &&
        passwordHasSpecialCharacters
    );
  }, [
    onComplianceChange,
    passwordLengthMoreThan8,
    passwordHasCapitalLetter,
    passwordHasLetter,
    passwordHasNumber,
    passwordHasSpecialCharacters,
  ]);

  return (
    <Box className={classes.container}>
      {rules.map((groupRules) => (
        <Box
          key={`${groupRules[0].name}-${groupRules.length}`}
          className={classes.rulesWrapper}
        >
          {groupRules.map((rule) => (
            <Box
              key={rule.name}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              {rule.referenceValue ? (
                <CheckBoxIcon className={classes.successColor} />
              ) : (
                <CheckBoxOutlineBlankIcon
                  className={classes.notAchievedColor}
                />
              )}
              <Typography variant="caption" style={{ marginLeft: 4 }}>
                {rule.name}
              </Typography>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};
export default PasswordCompliance;
