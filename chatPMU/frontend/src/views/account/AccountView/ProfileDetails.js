import clsx from 'clsx';
import {
  Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField, Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import updateProfile from '../../../actions/auth/updateProfile';

const useStyles = makeStyles(() => ({
  root: {},
}));

function ProfileDetails({ className, ...rest }) {
  const classes = useStyles();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const isRootUser = (user.roles || []).includes('root');

  return (
    <Formik
      initialValues={{
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
      }}
      validationSchema={Yup.object().shape({
        firstName: Yup.string().max(255).required('First name is required'),
        lastName: Yup.string().max(255).required('Last name is required'),
        username: Yup.string().max(255).required('Username is required'),
        email: Yup.string().max(255).required('Email is required'),
      })}
      onSubmit={(values, actions) => {
        dispatch(
          updateProfile({
            firstName: values.firstName,
            lastName: values.lastName,
            username: values.username,
            email: values.email,
            actions,
          }),
        );
      }}
    >
      {({
        errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values,
      }) => (
        <form autoComplete="off" noValidate className={clsx(classes.root, className)} {...rest}>
          <Card>
            <CardHeader subheader="Modifier vos informations" title="Mon Compte" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.firstName && errors.firstName)}
                    fullWidth
                    helperText={errors.firstName || 'First name, aka given name'}
                    label="First name"
                    name="firstName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.firstName}
                    variant="filled"
                    disabled={isRootUser}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.lastName && errors.lastName)}
                    fullWidth
                    helperText={errors.lastName || 'Last name, aka family name'}
                    label="Last name"
                    name="lastName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.lastName}
                    variant="filled"
                    disabled={isRootUser}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.username && errors.username)}
                    fullWidth
                    helperText={errors.username || 'Username, alphanumerical'}
                    label="Username"
                    name="username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.username}
                    variant="filled"
                    disabled={isRootUser}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={errors.email || 'A valid email address'}
                    label="Email Address"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.email}
                    variant="filled"
                    disabled={isRootUser}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
              <Box>
                {isRootUser && (
                <Typography color="error" gutterBottom variant="caption">
                  Root user can not be edited from here
                </Typography>
                )}
              </Box>
              <Button color="primary" variant="contained" disabled={isSubmitting || isRootUser} onClick={handleSubmit}>
                Enregistrer
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
}

export default ProfileDetails;
