import { useEffect, useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/styles';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import gravatarUrl from 'gravatar-url';
import { MicOff } from '@mui/icons-material';
import InterfaceOverlay from './InterfaceOverlay';

function UserContent({ peer, height }) {
  const theme = useTheme();
  const videoRef = useRef();
  const cover = useSelector((state) => state.media.settings.cover[peer.uuid]);

  useEffect(() => {
    if (!videoRef || !videoRef.current) {
      return;
    }
    if (peer.video) {
      videoRef.current.srcObject = peer.video.stream;
      videoRef.current.play();
    } else {
      videoRef.current.srcObject = null;
    }
  }, [peer.video]);

  if (peer.more) {
    return (
      <Avatar alt={`+${peer.peers}`} sx={{ width: 64, height: 64 }}>
        {`+${peer.peers}`}
      </Avatar>
    );
  }

  if (!peer.video && !peer.name) {
    return (
      <>
        <Avatar sx={{ width: 64, height: 64 }} />
        <Box mt={2}>
          <Typography
            variant="h6"
            component="p"
            sx={{ color: theme.palette.text.primary, textAlign: 'center' }}
          >
            Guest
          </Typography>
        </Box>
      </>
    );
  }

  if (!peer.video && peer.name) {
    return (
      <>
        <Avatar
          src={gravatarUrl(peer.email, { size: 128, default: '404', rating: 'g' })}
          sx={{ width: 64, height: 64 }}
        />
        <Box mt={2} display="flex">
          {!peer.audio && (
            <Box sx={{ visibility: 'hidden' }}>
              <MicOff fontSize="small" />
            </Box>
          )}
          <Box mx={1}>
            <Typography
              variant="h6"
              component="p"
              sx={{ color: theme.palette.text.primary, textAlign: 'center' }}
            >
              {peer.name}
            </Typography>
          </Box>
          {!peer.audio && (
            <Box sx={{ color: theme.palette.text.primary, marginTop: 0.1 }}>
              <MicOff fontSize="small" />
            </Box>
          )}
        </Box>
      </>
    );
  }

  return (
    <video
      ref={videoRef}
      playsInline
      muted
      style={{
        width: '100%',
        height,
        objectFit: cover && !peer.screen ? 'cover' : 'contain',
        background: theme.palette.background.deep,
        transform: `rotateY(${peer.screen || peer.facingMode === 'environment' ? 0 : 180}deg)`,
      }}
    />
  );
}

UserContent.propTypes = {
  peer: PropTypes.object,
  height: PropTypes.number,
};

function UserAudio({ peer }) {
  const audioRef = useRef();

  useEffect(() => {
    if (!audioRef || !audioRef.current) {
      return;
    }
    if (peer.audio) {
      audioRef.current.srcObject = peer.audio.stream;
      audioRef.current.play();
    } else {
      audioRef.current.srcObject = null;
    }
  }, [peer.audio]);

  return (
    <audio
      ref={audioRef}
      controls={false}
      style={{
        width: 0,
        height: 0,
        visibility: 'hidden',
      }}
    />
  );
}

UserAudio.propTypes = {
  peer: PropTypes.object,
};

function UserInterface({ peer = {}, height }) {
  const uuid = useSelector((state) => state.media.uuid);
  const theme = useTheme();
  const dispatch = useDispatch();
  return (
    <>
      <Box
        sx={{
          height: '100%',
          maxHeight: '100%',
          boxShadow: `inset 0 0 2px ${theme.palette.background.deep}`,
          cursor: peer.more ? 'pointer' : 'initial',
        }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        onClick={() => peer.more && dispatch({ type: 'drawer', value: true })}
      >
        <UserContent peer={peer} height={height} />
      </Box>
      {peer.audio && peer.uuid !== uuid && <UserAudio peer={peer} />}
      {!peer.more && <InterfaceOverlay peer={peer} />}
    </>
  );
}

UserInterface.propTypes = {
  peer: PropTypes.object,
  height: PropTypes.number,
};

export default UserInterface;
