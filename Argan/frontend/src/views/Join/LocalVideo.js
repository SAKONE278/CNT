import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

function LocalVideo() {
  const videoRef = useRef();
  const video = useSelector((state) => state.media.local.video);

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

  if (!video) {
    return null;
  }

  return (
    <Box pt={3} mb={0} pb={0}>
      <video
        ref={videoRef}
        playsInline
        muted
        style={{
          width: 240,
          height: 135,
          objectFit: 'cover',
          background: 'black',
          transform: 'rotateY(180deg)',
        }}
      />
    </Box>
  );
}

export default LocalVideo;
