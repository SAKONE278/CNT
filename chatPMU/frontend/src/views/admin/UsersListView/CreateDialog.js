import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Box, Button, TextField } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';

import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import createUser from '../../../actions/users/createUser';

function CreateDialog({ open, setOpen }) {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        isAdmin: false,
      }}
      onSubmit={(values, actions) => {
        dispatch(
          createUser({
            firstName: values.firstName,
            lastName: values.lastName,
            username: values.username,
            email: values.email,
            password: values.password,
            isAdmin: values.isAdmin,
            actions,
            setOpen,
          }),
        );
      }}
    >
      {({
        errors, handleBlur, handleChange, handleSubmit, handleReset, isSubmitting, touched, values,
      }) => (
        <Dialog open={open} onClose={() => setOpen(!open)} aria-labelledby="form-dialog-title" disableBackdropClick>
          <DialogTitle id="form-dialog-title">Create new user</DialogTitle>
          <DialogContent>
            <DialogContentText>Howdy! Are we going to have new user?</DialogContentText>
            <TextField
              autoFocus
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={errors.firstName || 'First name, aka given name'}
              margin="dense"
              name="firstName"
              onBlur={handleBlur}
              onChange={handleChange}
              label="First name"
              value={values.firstName}
              type="text"
              fullWidth
            />
            <TextField
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={errors.lastName || 'Last name, aka family name'}
              margin="dense"
              name="lastName"
              onBlur={handleBlur}
              onChange={handleChange}
              label="Last name"
              value={values.lastName}
              type="text"
              fullWidth
            />
            <TextField
              error={Boolean(touched.username && errors.username)}
              helperText={errors.username || 'Username, alphanumerical (accepts dashes)'}
              margin="dense"
              name="username"
              onBlur={handleBlur}
              onChange={handleChange}
              label="Username"
              value={values.username}
              type="text"
              fullWidth
            />
            <TextField
              error={Boolean(touched.email && errors.email)}
              helperText={errors.email || 'A valid email address'}
              margin="dense"
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              label="Email"
              value={values.email}
              type="email"
              fullWidth
            />
            <TextField
              error={Boolean(touched.password && errors.password)}
              helperText={errors.password || 'Must be at least 6 characters'}
              margin="dense"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              label="Password"
              value={values.password}
              type="password"
              fullWidth
            />
            <Box>
              <FormControlLabel
                control={<Switch checked={values.isAdmin} onChange={handleChange} name="isAdmin" />}
                label={
                  values.isAdmin
                    ? 'Admin (can edit users and see files from everyone)'
                    : 'Standard (can not edit users, can only see own files)'
                }
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleReset();
                setOpen(!open);
              }}
              color="primary"
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary" disabled={isSubmitting}>
              Create
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Formik>
  );
}

export default CreateDialog;
