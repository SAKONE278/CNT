import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Button } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';

import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import deleteUser from '../../../actions/users/deleteUser';

function DeleteDialog({ open, setOpen, user }) {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{}}
      onSubmit={(values, actions) => {
        dispatch(
          deleteUser({
            id: user.id,
            actions,
            setOpen,
          }),
        );
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Dialog open={open} onClose={() => setOpen(!open)} aria-labelledby="form-dialog-title" disableBackdropClick>
          <DialogTitle id="form-dialog-title">Suppression</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {`Voulez vous supprimer cet utilisateur ${user.firstName} ${user.lastName} avec le login @${user.username}?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(!open)} color="primary">
              Annuler
            </Button>
            <Button onClick={handleSubmit} color="primary" disabled={isSubmitting}>
              Supprimer
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Formik>
  );
}

export default DeleteDialog;
