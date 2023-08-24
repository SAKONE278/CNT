import { Box, Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import Page from '../../components/Page';
import logo from '../../assets/clover-logo.png';
import config from '../../config';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    flex: 1,
  },
}));

function NotFoundView() {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Page className={classes.root} title={`${t('welcomeView')} | ${config.appTitle}`}>
      <Box display="flex" flexDirection="column" height="100%" justifyContent="center">
        <Container maxWidth="md">
          <Box display="flex" justifyContent="center" mb={1}>
            <img src={logo} alt="logo" style={{ height: 70, zIndex: 1 }} />
          </Box>
          <Typography align="center" color="textPrimary" variant="subtitle2">
            Echangez plus facilement
          </Typography>
          <Typography align="center" color="textPrimary" variant="h3">
            CHAT CNT
          </Typography>
        </Container>
      </Box>
    </Page>
  );
}

export default NotFoundView;
