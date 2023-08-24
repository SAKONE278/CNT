import { Chat, People, Settings } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Drawer, Paper, Tab, Tabs,
} from '@mui/material';
import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import ChatTab from './ChatTab';
import PeersTab from './PeersTab';
import SettingsTab from './SettingsTab';

const useStyles = makeStyles((theme) => ({
  sidebar: {
    width: 360,
    background: theme.palette.background.paper,
  },
  container: {
    overflowY: 'hidden',
    flex: 1,
    height: '100%',
    maxWidth: 360,
    minWidth: 360,
  },
}));

function DrawerContent() {
  const classes = useStyles();
  const [tab, setTab] = useState(0);

  return (
    <Box height="100%" display="flex" flexDirection="column" className={classes.container}>
      <Paper square>
        <Tabs
          value={tab}
          onChange={(e, value) => setTab(value)}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab icon={<Chat />} />
          <Tab icon={<People />} />
          <Tab icon={<Settings />} />
        </Tabs>
      </Paper>
      {tab === 0 && <ChatTab />}
      {tab === 1 && <PeersTab />}
      {tab === 2 && <SettingsTab />}
    </Box>
  );
}

function MeetingBar() {
  const meetingDrawerOpen = useSelector((state) => state.drawer.open);
  const dispatch = useDispatch();

  return (
    <Drawer
      anchor="right"
      onClose={() => dispatch({ type: 'drawer', value: false })}
      open={meetingDrawerOpen}
      variant="temporary"
      sx={{ minWidth: 480, maxWidth: 360 }}
    >
      <DrawerContent />
    </Drawer>
  );
}

export default MeetingBar;
