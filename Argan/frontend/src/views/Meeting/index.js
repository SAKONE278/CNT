import { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Common from '../../common';
import config from '../../config';
import MeetingBar from './MeetingBar';
import UIMatrix from './UIMatrix';
import UIPinned from './UIPinned';
import Actions from '../../actions';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    flex: 1,
  },
}));

function MeetingManager() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const joined = useSelector((state) => state.media.joined);
  const ended = useSelector((state) => state.meeting.ended);
  const params = useParams();

  useEffect(() => {
    if (ended) {
      navigate('/');
    } else if (!joined) {
      navigate(`/join/${params.key}`);
    } else {
      dispatch(Actions.Media.joinMeeting());
    }
  }, [joined]);

  return null;
}

function MeetingUI() {
  const classes = useStyles();
  const ui = useSelector((state) => state.media.settings.ui);

  return (
    <Common.Page className={classes.root} title={`Meeting | ${config.appTitle}`}>
      {ui === 'matrix' && <UIMatrix />}
      {ui === 'pinned' && <UIPinned />}
      <MeetingBar />
    </Common.Page>
  );
}

function Meeting() {
  return (
    <>
      <MeetingUI />
      <MeetingManager />
    </>
  );
}

export default Meeting;
