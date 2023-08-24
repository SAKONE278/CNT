import {
  Box, Button, Card, Container, TextField, Typography, useTheme,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { OpenInNew } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Common from '../../common';
import config from '../../config';
import LocalVideo from './LocalVideo';
import MicrophoneToggle from './MicrophoneToggle';
import CameraToggle from './CameraToggle';
import NameInput from './NameInput';
import EmailInput from './EmailInput';
import JoinButton from './JoinButton';
import info from '../../version.json';
import logo from '../Home/logo.png';
import Utils from '../../utils';
import Actions from '../../actions';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    flex: 1,
  },
  brand: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 60,
  },
  appTitle: {
    fontFamily: 'KaushanScript',
    color: theme.palette.primary.deep,
  },
}));

function JoinManager() {
  const key = useSelector((state) => state.meeting.key);
  const params = useParams();
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.socket.id);

  useEffect(() => {
    if (key !== params.key) {
      dispatch({ type: 'meeting-key', value: params.key });
    }
  }, [key]);

  useEffect(() => {
    if (socket) {
      dispatch(Actions.IO.joinRoom(key));
    }
  }, [socket]);

  return null;
}

function JoinUI() {
  const classes = useStyles();
  const theme = useTheme();
  const key = useSelector((state) => state.meeting.key);

  return (
    <Common.Page className={classes.root} title={`Joindre la conférence | ${config.appTitle}`}>
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
        sx={{ paddingTop: 36, paddingBottom: 36 }}
      >
        <Container maxWidth="xs">
          <Card>
            <Box display="flex" flexDirection="column" alignItems="center" p={3} backgroundColor="#31703F">
              <Box className={classes.brand}>
                <img className={classes.logo} src={logo} alt={`${config.appTitle} Logo`} />
                <Box mb={1}>
                  <Typography
                    variant="h3"
                    component="p"
                    textAlign="center"
                    className={classes.appTitle}
                    sx={{ fontFamily: 'KaushanScript', fontSize: 32 }}
                  >
                    {/* {config.appTitle} */}
                  </Typography>
                </Box>
              </Box>
              <Box mt={1}>
                <Typography
                  variant="h2"
                  component="p"
                  style={{ color: theme.palette.primary.deep, textAlign: 'center' }}
                >
                  Télé Conférence
                </Typography>
              </Box>
              {config.demo && (
                <Box width="60%" display="flex" pt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    href="https://codecanyon.net/user/honeyside/portfolio"
                    target="_blank"
                    size="small"
                    endIcon={<OpenInNew />}
                  >
                    Par STRATEGIS SARL
                  </Button>
                </Box>
              )}
              <NameInput />
              <EmailInput />
              <LocalVideo />
              <Box display="flex" pt={3}>
                <MicrophoneToggle />
                <CameraToggle />
              </Box>
              <Box width="100%" mt={2}>
                <TextField
                  variant="standard"
                  helperText={`${
                    window.innerWidth > window.innerHeight ? 'CTRL+C pour copier le lien' : ' '
                  }`}
                  margin="dense"
                  name="url"
                  label="Lien de la conférence"
                  value={`${config.url}/meeting/${key}`}
                  type="text"
                  fullWidth
                  onFocus={async (e) => {
                    e.target.select();
                    try {
                      await navigator.clipboard.writeText(`${config.url}/meeting/${key}`);
                    } catch (x) {
                      Utils.logger.warn('could not copy url to clipboard');
                    }
                  }}
                />
              </Box>
              <JoinButton />
            </Box>
          </Card>
        </Container>
        <Box mt={1}>
          <Typography
            variant="caption"
            component="p"
            style={{ color: theme.palette.text.secondary, textAlign: 'center' }}
          >
            STRATEGIS - 2023 &copy;
            {' v'}
            {info.version}
            {' ('}
            {info.build}
            )
          </Typography>
        </Box>
      </Box>
    </Common.Page>
  );
}

function Join() {
  return (
    <>
      <JoinUI />
      <JoinManager />
    </>
  );
}

export default Join;
