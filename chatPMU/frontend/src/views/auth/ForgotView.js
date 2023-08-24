import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box, Button, Container, Link, TextField, Typography, useTheme,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import logo from '../../assets/clover-logo.png';
import config from '../../config';
import Page from '../../components/Page';
import requestCode from '../../actions/auth/requestCode';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
  },
  white: {
    color: 'white',
  },
  textFieldInput: {
    color: 'white',
    backgroundColor: 'rgba(0,0,0,.4)',
  },
  notchedOutline: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,.4) !important',
  },
  errorNotchedOutline: {
    borderWidth: 1,
  },
}));

function ForgotView() {
  const theme = useTheme();
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <Page className={classes.root} title={`${t('forgotView')} | ${config.appTitle}`}>
      <Box display="flex" flexDirection="column" py={theme.spacing(16)}>
        <Container maxWidth="xs">
          <Formik
            initialValues={{
              email: '',
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().max(255).required(t('forgotViewEmailRequired')),
            })}
            onSubmit={(values, actions) => {
              dispatch(
                requestCode({
                  email: values.email,
                  navigate,
                  actions,
                }),
              );
            }}
          >
            {({
              errors, touched, handleChange, handleSubmit, isSubmitting, values,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box display="flex" justifyContent="center">
                  <img src={logo} alt="logo" style={{ height: 70, zIndex: 1 }} />
                </Box>
                <Box mt={1.5} mb={0.5} display="flex" flexDirection="column" alignItems="center">
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    {t('forgotViewTitle')}
                  </Typography>
                </Box>
                <TextField
                  error={touched.email && Boolean(errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label={t('forgotViewEmail')}
                  margin="normal"
                  name="email"
                  onChange={handleChange}
                  type="text"
                  value={values.email}
                  variant="outlined"
                  InputProps={{
                    className: classes.textFieldInput,
                    classes: {
                      notchedOutline:
                        touched.email && errors.email ? classes.errorNotchedOutline : classes.notchedOutline,
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color: 'white',
                    },
                  }}
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    {t('forgotViewSubmit')}
                  </Button>
                </Box>

                <Box display="flex" justifyContent="center" mt={2}>
                  <Typography color="textSecondary" variant="h5">
                    <Link component={RouterLink} to="/auth/login" variant="h6">
                      {t('forgotViewRememberNow')}
                    </Link>
                  </Typography>
                </Box>

                <Box display="flex" justifyContent="center" mt={2}>
                  <Typography className={classes.white} variant="caption">
                    {moment().format('YYYY')}
                    {' '}
                    &copy; v
                    {config.version}
                    {' '}
                    (
                    {config.build}
                    )
                  </Typography>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
}

export default ForgotView;
