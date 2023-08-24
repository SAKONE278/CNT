import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Container } from '@mui/material';
import { useSelector } from 'react-redux';
import ResponsiveAppBar from '../../components/ResponsiveAppBar';
import Sidebar from '../../components/Sidebar';

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
    overflow: 'hidden',
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
  backgroundFix: {
    backgroundColor: 'rgba(0,0,0,.7)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
}));

function MainLayout() {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate('/auth/login', { replace: true });
  }, []);

  if (!token) {
    return <div />;
  }

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div
            className={classes.content}
            style={{ background: `url('${'/background/background.png'}')`, backgroundSize: 'cover' }}
          >
            <div className={classes.backgroundFix} />
            <ResponsiveAppBar isDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
            <Container maxWidth="xl" className={classes.container} disableGutters>
              <div className={classes.split}>
                <Sidebar openMobile={drawerOpen} onMobileClose={() => setDrawerOpen(false)} />
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
