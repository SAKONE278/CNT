import { Box, Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Page from '../../../components/Page';
import config from '../../../config';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    flex: 1,
    width: '100%',
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
            Admin Dashboard
          </Typography>
          <Typography align="center" color="textPrimary" variant="subtitle2">
            This feature is under development and will be added in 4.1.0.
          </Typography>
          <Typography align="center" color="textPrimary" variant="subtitle2">
            You can manage your users, though.
          </Typography>
          <Typography align="center" color="textPrimary" variant="subtitle2">
            <Link to="/admin/users" style={{ color: '#feb100' }}>
              Click here to go to the users section.
            </Link>
          </Typography>
        </Container>
      </Box>
    </Page>
  );
}

export default NotFoundView;
