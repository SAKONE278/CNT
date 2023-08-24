import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Button } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';

import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import deleteUsers from '../../../actions/users/deleteUsers';

function DeleteManyDialog({ open, setOpen, users }) {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{}}
      onSubmit={(values, actions) => {
        dispatch(
          deleteUsers({
            ids: users.map((e) => e.id),
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
              {`Do you really want to delete users ${users.map((e) => `@${e.username}`).join(', ')}?`}
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

export default DeleteManyDialog;
