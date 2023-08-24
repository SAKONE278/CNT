import {
  Box, Button, Card, Container, Typography, useTheme,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { OpenInNew, Shuffle } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import randomWords from 'random-words';
import { useEffect } from 'react';
import Common from '../../common';
import config from '../../config';
import MeetingKeyInput from './MeetingKeyInput';
import GoToButton from './GoToButton';
import info from '../../version.json';
import logo from './logo.png';
import Utils from '../../utils';

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

function HomeManager() {
  const dispatch = useDispatch();
  const key = useSelector((state) => state.meeting.key);

  useEffect(() => {
    if (!key || Utils.isEmpty(key)) {
      dispatch({ type: 'meeting-key', value: randomWords(4).join('-') });
    }
  }, []);

  return null;
}

function HomeUI() {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();

  return (
    <Common.Page className={classes.root} title={`Joindre | ${config.appTitle}`}>
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
                    {'' /* {config.appTitle} */}
                  </Typography>
                </Box>
              </Box>
              <Box mt={1}>
                <Typography
                  variant="h2"
                  component="p"
                  style={{ color: theme.palette.primary.deep, textAlign: 'center', fontWeight: 'bold' }}
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
                    PAR STRATEGIS SARL
                  </Button>
                </Box>
              )}
              <MeetingKeyInput />
              <Box mt={1}>
                <Typography
                  variant="h6"
                  component="p"
                  style={{ color: theme.palette.primary.deep, textAlign: 'center' }}
                >
                  - ou -
                </Typography>
              </Box>
              <Box width="60%" display="flex" pt={1} pb={2}>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={() => dispatch({ type: 'meeting-key-random' })}
                  size="small"
                  endIcon={<Shuffle />}
                >
                  Code Aléatoire
                </Button>
              </Box>
              {config.demo && (
                <Box mt={3}>
                  <Typography
                    variant="h6"
                    component="p"
                    style={{ color: theme.palette.primary.deep, textAlign: 'center' }}
                  >
                    Warning: this is a demo. Please do not hold your business meetings on this
                    server.
                  </Typography>
                </Box>
              )}
              <GoToButton />
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

function Home() {
  return (
    <>
      <HomeUI />
      <HomeManager />
    </>
  );
}

export default Home;
