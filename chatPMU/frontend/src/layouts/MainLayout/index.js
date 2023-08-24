import { Outlet } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Container } from '@mui/material';
import ResponsiveAppBar from '../../components/ResponsiveAppBar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
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
    overflow: 'none',
    display: 'flex',
    flexDirection: 'column',
  },
  backgroundFix: {
    backgroundColor: 'rgba(0,0,0,.7)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  flow: {
    width: '100%',
    height: '100%',
    maxHeight: '100%',
    overflow: 'auto',
    zIndex: 1,
  },
  container: {
    height: '100%',
    overflow: 'none',
  },
  split: {
    flex: '1 1 auto',
    height: '100%',
    maxHeight: '100%',
    overflow: 'none',
    display: 'flex',
  },
}));

function MainLayout() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div
            className={classes.content}
            style={{ background: `url('${'/background/background.png'}')`, backgroundSize: 'cover' }}
          >
            <div className={classes.backgroundFix} />
            <ResponsiveAppBar type="auth" />
            <div className={classes.flow}>
              <Container maxWidth="xl" className={classes.container} disableGutters>
                <div className={classes.split}>
                  <Outlet />
                </div>
              </Container>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
