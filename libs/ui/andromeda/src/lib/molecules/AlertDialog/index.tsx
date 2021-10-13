import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogProps,
} from '@material-ui/core';
import Button from '../../atoms/Button';

export interface AlertDialogProps extends DialogProps {
  title?: string;
  message?: string;
  actions?: {
    label: string;
    action: () => void;
  }[];
}

const AlertDialog = ({
  title,
  message,
  actions,
  ...props
}: AlertDialogProps): JSX.Element => {
  return (
    <Dialog {...props}>
      {title && <DialogTitle>{title}</DialogTitle>}
      {message && (
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
      )}

      {actions && (
        <DialogActions>
          {actions.map((action) => (
            <Button key={action.label} variant="text" onClick={action.action}>
              {action.label}
            </Button>
          ))}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default AlertDialog;
