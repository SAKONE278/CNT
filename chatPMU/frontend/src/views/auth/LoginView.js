import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box, Button, Container, Link, TextField, Typography, useTheme,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import moment from 'moment';
import login from '../../actions/auth/login';
import logo from '../../assets/clover-logo.png';
import config from '../../config';
import Page from '../../components/Page';

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

function LoginView() {
  const theme = useTheme();
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Page className={classes.root} title={`${t('loginView')} | ${config.appTitle}`}>
      <Box display="flex" flexDirection="column" py={theme.spacing(16)}>
        <Container maxWidth="xs">
          <Formik
            initialValues={{
              username: config.demo ? 'root' : '',
              password: config.demo ? 'root' : '',
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string().max(255).required(t('loginViewUsernameRequired')),
              password: Yup.string().max(255).required(t('loginViewPasswordRequired')),
            })}
            onSubmit={(values, actions) => {
              dispatch(
                login({
                  username: values.username,
                  password: values.password,
                  navigate,
                  actions,
                }),
              );
            }}
          >
            {({
              errors, handleChange, handleSubmit, isSubmitting, values, touched,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box display="flex" justifyContent="center">
                  <img src={logo} alt="logo" style={{ height: 70, zIndex: 1 }} />
                </Box>
                <Box mt={2} mb={1} display="flex" flexDirection="column" alignItems="center">
                  <Typography className={classes.white} fontSize="36px" gutterBottom variant="body2">
                    Chat
                  </Typography>
                </Box>
                <TextField
                  error={touched.username && Boolean(errors.username)}
                  fullWidth
                  helperText={touched.username && errors.username}
                  label="Email ou login"
                  margin="normal"
                  name="username"
                  onChange={handleChange}
                  type="text"
                  value={values.username}
                  variant="outlined"
                  InputProps={{
                    className: classes.textFieldInput,
                    classes: {
                      notchedOutline:
                        touched.username && errors.username ? classes.errorNotchedOutline : classes.notchedOutline,
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
                  label="Mot de passe"
                  margin="normal"
                  name="password"
                  onChange={handleChange}
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  variant="outlined"
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
                          style={{ color: 'white' }}
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
                    SE CONNECTER
                  </Button>
                </Box>

                <Box display="flex" justifyContent="center">
                  <Typography className={classes.white} variant="h5">
                    <Link className={classes.white} component={RouterLink} to="/auth/forgot" variant="h6">
                      Mot de passe oublié
                    </Link>
                  </Typography>
                </Box>

                <Box display="flex" justifyContent="center" mt={2}>
                  <Typography className={classes.white} variant="caption">
                    {' STRATEGIS - '}
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

export default LoginView;
