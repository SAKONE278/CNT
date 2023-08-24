import { Box, Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import Page from '../../components/Page';
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
    <Page className={classes.root} title={`${t('notFoundView')} | ${config.appTitle}`}>
      <Box display="flex" flexDirection="column" height="100%" justifyContent="center">
        <Container maxWidth="md">
          <Typography align="center" color="textPrimary" variant="h1">
            404: The page you are looking for isn’t here
          </Typography>
          <Typography align="center" color="textPrimary" variant="subtitle2">
            You either tried some shady route or you came here by mistake. Whichever it is, try using the navigation
          </Typography>
        </Container>
      </Box>
    </Page>
  );
}

export default NotFoundView;
