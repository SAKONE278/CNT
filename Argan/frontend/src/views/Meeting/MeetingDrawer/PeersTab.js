import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { PushPin, Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import gravatarUrl from 'gravatar-url';
import LocalVideo from './LocalVideo';

function PeersTab() {
  const interfaces = useSelector((state) => state.media.interfaces);
  const pinned = useSelector((state) => state.media.settings.pinned);
  const hidden = useSelector((state) => state.media.settings.hidden);
  const dispatch = useDispatch();
  const getPeerType = (peer) => {
    if (peer.screen) {
      return 'Screen share';
    }
    if (peer.video && !peer.audio) {
      return 'Video only';
    }
    if (peer.audio && !peer.video) {
      return 'Audio only';
    }
    return 'Silent listener';
  };

  return (
    <Box
      style={{
        textAlign: 'center',
        height: 'calc(100% - 48px)',
        maxHeight: 'calc(100% - 48px)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <LocalVideo />
      <Box px={1.5} style={{ overflowY: 'auto', flex: 1 }}>
        <List dense={false}>
          {interfaces.map((peer) => (
            <ListItem
              key={peer.uuid}
              secondaryAction={(
                <Box>
                  <IconButton
                    edge="end"
                    aria-label="Pin"
                    color={pinned === peer.id ? 'primary' : 'secondary'}
                    onClick={() => {
                      if (pinned === peer.id) {
                        dispatch({ type: 'switch-ui', value: 'matrix', pin: null });
                      } else {
                        dispatch({ type: 'switch-ui', value: 'pinned', pin: peer.id });
                      }
                    }}
                  >
                    <PushPin />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="Hide"
                    color={!hidden.set.has(peer.id) ? 'primary' : 'secondary'}
                    onClick={() => {
                      if (hidden.set.has(peer.id)) {
                        dispatch({ type: 'interface-show', value: peer.id });
                      } else {
                        dispatch({ type: 'interface-hide', value: peer.id });
                      }
                    }}
                  >
                    {!hidden.set.has(peer.id) ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </Box>
              )}
            >
              <ListItemAvatar>
                <Avatar
                  src={gravatarUrl(peer.email, { size: 128, default: '404', rating: 'g' })}
                  sx={{ width: 48, height: 48, marginRight: 2 }}
                />
              </ListItemAvatar>
              <ListItemText primary={peer.name} secondary={getPeerType(peer)} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}
export default PeersTab;
