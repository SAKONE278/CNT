import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/styles';
import { Box, Typography } from '@mui/material';

function UserContent({
  user, video, cover = true, height,
}) {
  const theme = useTheme();
  const videoRef = useRef();

  useEffect(() => {
    if (!videoRef || !videoRef.current) {
      return;
    }
    if (video) {
      videoRef.current.srcObject = video.stream;
      videoRef.current.play();
    } else {
      videoRef.current.srcObject = null;
    }
  }, [video]);

  if (!video && (!user || !user.firstName)) {
    return (
      <>
        <Avatar alt="Guest" sx={{ width: 64, height: 64 }} />
        <Box mt={2}>
          <Typography variant="h6" component="p" style={{ color: theme.palette.text.primary, textAlign: 'center' }}>
            Guest
          </Typography>
        </Box>
      </>
    );
  }

  if (!video && user && user.firstName) {
    return (
      <>
        <Avatar
          alt={`${user.firstName} ${user.lastName}`}
          sx={{ width: 64, height: 64 }}
          src={user.picture && user.picture.mediumThumbnailUrl}
        >
          {user.firstName.charAt(0)}
          {user.lastName.charAt(0)}
        </Avatar>
        <Box mt={2}>
          <Typography variant="h6" component="p" style={{ color: theme.palette.text.primary, textAlign: 'center' }}>
            {`${user.firstName} ${user.lastName}`}
          </Typography>
        </Box>
      </>
    );
  }

  return (
    <video
      ref={videoRef}
      style={{
        width: '100%',
        height,
        objectFit: cover ? 'cover' : 'contain',
        background: theme.palette.background.deep,
        transform: 'rotateY(180deg)',
      }}
    />
  );
}

function UserInterface({ user, video, height }) {
  const theme = useTheme();
  const cover = useSelector((state) => state.meeting.settings.cover);
  return (
    <Box
      sx={{ height: '100%', maxHeight: '100%', boxShadow: `inset 0 0 2px ${theme.palette.background.deep}` }}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <UserContent user={user} video={video} cover={cover} height={height} />
    </Box>
  );
}

export default UserInterface;
