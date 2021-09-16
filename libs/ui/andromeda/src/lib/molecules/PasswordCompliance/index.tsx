// import {
//   FormControl,
//   FormHelperText,
//   InputLabel,
//   makeStyles,
//   OutlinedInput,
//   OutlinedInputProps,
// } from '@material-ui/core';
// import { Controller, Control } from 'react-hook-form';

// const useStyles = makeStyles((theme) => ({
//   inputWrapper: {
//     [theme.breakpoints.down('md')]: {
//       marginBottom: 16,
//     },
//     [theme.breakpoints.up('md')]: {
//       marginBottom: 24,
//     },
//   },
// }));

// export interface PasswordComplianceProps {
//   value: string;
// }

// const PasswordCompliance: React.FC<PasswordComplianceProps> = ({ value }) => {
//   const classes = useStyles();

//   return (
//     <FormControl
//       variant="outlined"
//       className={classes.inputWrapper}
//       error={!!error}
//       fullWidth
//     >
//       <InputLabel htmlFor={`${label} label`}>{label}</InputLabel>
//       <OutlinedInput
//         id={`${label} label`}
//         ref={innerRef}
//         aria-describedby={label || 'input text'}
//         label={label}
//         {...props}
//       />
//       {helperText && (
//         <FormHelperText id={`${helperText} text`}>{helperText}</FormHelperText>
//       )}
//       {!!errorText && (
//         <FormHelperText error id={`${errorText} text`}>
//           {errorText}
//         </FormHelperText>
//       )}
//     </FormControl>
//   );
// };
// export default PasswordCompliance;
