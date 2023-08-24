import clsx from 'clsx';
import {
  Box, Button, Card, CardContent, CardHeader, Divider, TextField, Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Formik } from 'formik';
import changePassword from '../../../actions/users/changePassword';

const useStyles = makeStyles({
  root: {},
});

function Password({ className, ...rest }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const isRootUser = (user.roles || []).includes('root');

  return (
    <Formik
      initialValues={{
        password: '',
        confirm: '',
      }}
      validationSchema={Yup.object().shape({
        confirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
      })}
      onSubmit={(values, actions) => {
        dispatch(
          changePassword({
            password: values.password,
            actions,
          }),
        );
        actions.setValues({
          password: '',
          confirm: '',
        });
      }}
    >
      {({
        errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values,
      }) => (
        <form className={clsx(classes.root, className)} {...rest}>
          <Card>
            <CardHeader subheader="Mise à jour du mot de passe" title="Mot de passe" />
            <Divider />
            <CardContent>
              <TextField
                error={Boolean(touched.password && errors.password)}
                fullWidth
                helperText={errors.password || 'Must be at least 6 characters'}
                label="New password"
                margin="normal"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.password}
                variant="outlined"
                disabled={isRootUser}
              />
              <TextField
                error={Boolean(touched.confirm && errors.confirm)}
                fullWidth
                helperText={errors.confirm || 'Your new password, again'}
                label="Confirm new password"
                margin="normal"
                name="confirm"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.confirm}
                variant="outlined"
                disabled={isRootUser}
              />
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
              <Button
                color="primary"
                variant="contained"
                disabled={isSubmitting || !!isRootUser}
                onClick={handleSubmit}
              >
                METTRE A JOUR
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
}

export default Password;
