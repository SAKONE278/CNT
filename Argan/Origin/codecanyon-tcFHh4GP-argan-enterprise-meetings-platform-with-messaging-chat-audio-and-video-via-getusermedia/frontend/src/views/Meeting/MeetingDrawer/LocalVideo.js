import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { useTheme } from '@mui/styles';

function LocalVideo() {
  const theme = useTheme();
  const videoRef = useRef();
  const video = useSelector((state) => state.media.local.video);
  const preview = useSelector((state) => state.media.settings.preview);

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

  if (!preview || !video) {
    return null;
  }

  if (video) {
    return (
      <video
        ref={videoRef}
        playsInline
        muted
        style={{
          width: 360,
          height: (360 / 14) * 9,
          objectFit: 'cover',
          background: theme.palette.background.deep,
          transform: 'rotateY(180deg)',
        }}
      />
    );
  }
}

export default LocalVideo;
