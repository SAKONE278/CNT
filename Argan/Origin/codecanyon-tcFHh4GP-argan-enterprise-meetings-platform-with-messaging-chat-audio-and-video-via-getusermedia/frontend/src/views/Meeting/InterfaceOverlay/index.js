import { Box, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@mui/styles';
import { MicOff } from '@mui/icons-material';
import PinFab from './PinFab';
import CoverFab from './CoverFab';
import HideFab from './HideFab';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
    position: 'relative',
    top: '-100%',
    left: 0,
    zIndex: 1,
  },
  overlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  controls: {
    display: 'flex',
  },
  name: {
    marginTop: 12,
    display: 'flex',
  },
}));

function InterfaceOverlay({ peer }) {
  const classes = useStyles();
  const theme = useTheme();
  const boxRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [timeoutRef, setTimeoutRef] = useState(null);

  const handleMouseMove = () => {
    if (timeoutRef) {
      clearTimeout(timeoutRef);
    }
    const newTimeoutRef = setTimeout(() => {
      setIsHovering(false);
    }, 3000);
    setTimeoutRef(newTimeoutRef);
    if (!isHovering) {
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <Box
      ref={boxRef}
      className={classes.root}
      onMouseMove={handleMouseMove}
      onClick={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {isHovering && (
        <Box className={classes.overlay}>
          <Box className={classes.controls}>
            <PinFab id={peer.id} />
            <CoverFab uuid={peer.uuid} screen={peer.screen} />
            <HideFab id={peer.id} />
          </Box>
          {peer.video && (
            <Box className={classes.name}>
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
          )}
        </Box>
      )}
    </Box>
  );
}

InterfaceOverlay.propTypes = {
  peer: PropTypes.object,
};

export default InterfaceOverlay;
