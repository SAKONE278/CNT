import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import moment from 'moment';
import logo from '../../assets/clover-logo.png';
import config from '../../config';
import Page from '../../components/Page';
import signUp from '../../actions/auth/signUp';

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

function SignUpView() {
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
    <Page className={classes.root} title={`${t('signUpView')} | ${config.appTitle}`}>
      <Box display="flex" flexDirection="column" py={theme.spacing(5)}>
        <Container maxWidth="xs">
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              username: '',
              password: '',
              policy: true,
            }}
            validationSchema={Yup.object().shape({
              firstName: Yup.string().max(255).required(t('signUpViewGivenNameRequired')),
              lastName: Yup.string().max(255).required(t('signUpViewFamilyNameRequired')),
              email: Yup.string().max(255).required(t('signUpViewEmailRequired')),
              username: Yup.string().max(255).required(t('signUpViewUsernameRequired')),
              password: Yup.string().max(255).required(t('signUpViewPasswordRequired')),
              policy: Yup.boolean().isTrue(t('signUpViewPolicyRequired')),
            })}
            onSubmit={(values, actions) => {
              dispatch(
                signUp({
                  firstName: values.firstName,
                  lastName: values.lastName,
                  email: values.email,
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
                  <Typography className={classes.white} gutterBottom variant="body2">
                    {' Bienvenu! rejoingnez vos collègues pour échanger '}
                  </Typography>
                </Box>
                <TextField
                  error={touched.firstName && Boolean(errors.firstName)}
                  fullWidth
                  helperText={touched.firstName && errors.firstName}
                  label="Nom"
                  margin="normal"
                  name="firstName"
                  onChange={handleChange}
                  type="text"
                  value={values.firstName}
                  variant="outlined"
                  InputProps={{
                    className: classes.textFieldInput,
                    classes: {
                      notchedOutline:
                        touched.firstName && errors.firstName ? classes.errorNotchedOutline : classes.notchedOutline,
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color: 'white',
                    },
                  }}
                />
                <TextField
                  error={touched.lastName && Boolean(errors.lastName)}
                  fullWidth
                  helperText={touched.lastName && errors.lastName}
                  label="Prénom"
                  margin="normal"
                  name="lastName"
                  onChange={handleChange}
                  type="text"
                  value={values.lastName}
                  variant="outlined"
                  InputProps={{
                    className: classes.textFieldInput,
                    classes: {
                      notchedOutline:
                        touched.lastName && errors.lastName ? classes.errorNotchedOutline : classes.notchedOutline,
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color: 'white',
                    },
                  }}
                />
                <TextField
                  error={touched.email && Boolean(errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label={t('signUpViewEmail')}
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
                <TextField
                  error={touched.username && Boolean(errors.username)}
                  fullWidth
                  helperText={touched.username && errors.username}
                  label="Nom d'utilisateur"
                  margin="normal"
                  name="username"
                  onChange={handleChange}
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
                <Box alignItems="center" display="flex" ml={-1}>
                  <Checkbox checked={values.policy} name="policy" onChange={handleChange} />
                  <Typography color="textSecondary" variant="body1">
                    {' j \'accepte les'}
                    {' '}
                    <Link
                      color="primary"
                      onClick={() => window.open('/', '_blank')}
                      underline="always"
                      variant="h6"
                      style={{ cursor: 'pointer' }}
                    >
                      {' Termes et Conditions'}
                    </Link>
                  </Typography>
                </Box>
                {Boolean(touched.policy && errors.policy) && <FormHelperText error>{errors.policy}</FormHelperText>}
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    {' ENREGISTRER'}
                  </Button>
                </Box>

                <Box display="flex" justifyContent="center" mt={2}>
                  <Typography className={classes.white} variant="h5">
                    <Link className={classes.white} component={RouterLink} to="/auth/login" variant="h6">
                      {' j\'ai déja un compte'}
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

export default SignUpView;
