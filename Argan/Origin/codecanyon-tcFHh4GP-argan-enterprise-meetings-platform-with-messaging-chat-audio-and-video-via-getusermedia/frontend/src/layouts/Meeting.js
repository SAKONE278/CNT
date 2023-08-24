import { Outlet } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Container } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    maxHeight: '100%',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  split: {
    flex: '1 1 auto',
    height: '100%',
    maxHeight: '100%',
    overflow: 'auto',
    display: 'flex',
  },
  container: {
    height: '100%',
    zIndex: 1,
  },
}));

function MainLayout() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Container maxWidth="xl" className={classes.container} disableGutters>
              <div className={classes.split}>
                <Outlet />
              </div>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
