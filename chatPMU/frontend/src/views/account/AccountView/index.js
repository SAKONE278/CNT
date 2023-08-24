import {
  Box, Container, Grid, useTheme,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import Page from '../../../components/Page';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import Password from './Password';
import Logout from './Logout';
import config from '../../../config';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100%',
  },
}));

function Account() {
  const theme = useTheme();
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Page
      className={classes.root}
      title={`${t('Settings')} | ${config.appTitle}`}
      style={{ maxHeight: 'calc(100vh - 64px)' }}
    >
      <Container maxWidth="lg" style={{ overflowY: 'auto', maxHeight: '100%' }}>
        <Grid container spacing={3} style={{ paddingTop: theme.spacing(3), paddingBottom: theme.spacing(3) }}>
          <Grid item lg={4} md={6} xs={12}>
            <Profile />
            <Box mt={3}>
              <Logout />
            </Box>
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <ProfileDetails />
            <Box mt={3}>
              <Password />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default Account;
