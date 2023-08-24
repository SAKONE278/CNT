import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box, Button, Container, Link, TextField, Typography, useTheme,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import moment from 'moment';
import logo from '../../assets/clover-logo.png';
import config from '../../config';
import Page from '../../components/Page';
import resetPassword from '../../actions/auth/resetPassword';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
  },
  white: {
    color: 'white',
  },
  info: {
    color: theme.colors.orange[400],
    textAlign: 'center',
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

function ResetView() {
  const theme = useTheme();
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);
  const { t } = useTranslation();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (!email) {
      dispatch({ type: 'snack', severity: 'info', content: t('resetViewForgotRedirect') });
      navigate('/auth/forgot');
    }
  }, [email]);

  return (
    <Page className={classes.root} title={`${t('resetView')} | ${config.appTitle}`}>
      <Box display="flex" flexDirection="column" py={theme.spacing(16)}>
        <Container maxWidth="xs">
          <Formik
            initialValues={{
              code: '',
              password: '',
            }}
            validationSchema={Yup.object().shape({
              code: Yup.string().max(255).required(t('resetViewAuthCodeRequired')),
              password: Yup.string().max(255).required(t('resetViewNewPasswordRequired')),
            })}
            onSubmit={(values, actions) => {
              dispatch(
                resetPassword({
                  email,
                  code: values.code,
                  password: values.password,
                  navigate,
                  actions,
                  message: t('resetViewActionMessage'),
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
                    {t('motto')}
                  </Typography>
                </Box>
                {Object.keys(errors).length === 0 && (
                <Box mt={1.5} mb={0.5} display="flex" flexDirection="column" alignItems="center">
                  <Typography className={classes.info} gutterBottom variant="body2">
                    {t('resetViewAuthCodeSent')}
                  </Typography>
                </Box>
                )}
                <TextField
                  error={touched.code && Boolean(errors.code)}
                  fullWidth
                  helperText={touched.code && errors.code}
                  margin="normal"
                  name="code"
                  onChange={handleChange}
                  type="text"
                  value={values.code}
                  variant="outlined"
                  label={t('resetViewAuthCode')}
                  InputProps={{
                    className: classes.textFieldInput,
                    classes: {
                      notchedOutline:
                        touched.code && errors.code ? classes.errorNotchedOutline : classes.notchedOutline,
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color: 'white',
                    },
                  }}
                />
                <TextField
                  error={touched.password && Boolean(errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  margin="normal"
                  name="password"
                  onChange={handleChange}
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  variant="outlined"
                  label={t('resetViewNewPassword')}
                  InputProps={{
                    className: classes.textFieldInput,
                    classes: {
                      notchedOutline:
                        touched.password && errors.password ? classes.errorNotchedOutline : classes.notchedOutline,
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
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
                    {t('resetViewSubmit')}
                  </Button>
                </Box>

                <Box display="flex" justifyContent="center">
                  <Typography color="textSecondary" variant="h5">
                    <Link component={RouterLink} to="/auth/login" variant="h6">
                      {t('resetViewRememberNow')}
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

export default ResetView;
