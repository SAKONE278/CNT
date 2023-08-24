import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { makeStyles, useTheme } from '@mui/styles';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import UserInterface from './UserInterface';
import Utils from '../../utils';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    overflowY: 'hidden',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
  },
  pinned: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 4,
  },
  mobilePinned: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 3,
  },
}));

function Peer({ peer, items, rootHeight }) {
  const itemHeight = (rootHeight / items) * (peer.span || 1);
  return (
    <Box
      sx={{
        maxHeight: window.innerHeight > window.innerWidth ? rootHeight / 4 : itemHeight,
        height: window.innerHeight > window.innerWidth ? rootHeight / 4 : itemHeight,
        minHeight: window.innerHeight > window.innerWidth ? rootHeight / 4 : itemHeight,
        flex: window.innerHeight > window.innerWidth ? 1 : 0,
      }}
    >
      <UserInterface
        height={window.innerHeight > window.innerWidth ? rootHeight / 4 : itemHeight}
        peer={peer}
      />
    </Box>
  );
}

Peer.propTypes = {
  peer: PropTypes.object,
  items: PropTypes.number,
  rootHeight: PropTypes.number,
};

function Column({ column, rootHeight }) {
  const classes = useStyles();
  return (
    <Box className={classes.column} key={uuidv4()}>
      {column.map((peer) => {
        return <Peer peer={peer} items={column.length} rootHeight={rootHeight} key={uuidv4()} />;
      })}
    </Box>
  );
}

Column.propTypes = {
  column: PropTypes.array,
  rootHeight: PropTypes.number,
};

function Row({ row, rootHeight }) {
  const classes = useStyles();
  return (
    <Box className={classes.row} key={uuidv4()}>
      {row.map((peer) => {
        return <Peer peer={peer} items={row.length} rootHeight={rootHeight} key={uuidv4()} />;
      })}
    </Box>
  );
}

Row.propTypes = {
  row: PropTypes.array,
  rootHeight: PropTypes.number,
};

function UIPinned() {
  const theme = useTheme();
  const classes = useStyles();
  const interfaces = useSelector((state) => state.media.interfaces);
  const more = useSelector((state) => state.media.settings.more);
  const pinned = useSelector((state) => state.media.settings.pinned);
  const hidden = useSelector((state) => state.media.settings.hidden);
  const { height, width } = Utils.useWindowDimensions();

  const rootHeight = height - (width < 600 ? 56 : 64);

  const pinnedInterface = interfaces.find((e) => e.id === pinned);
  const filteredInterfaces = interfaces.filter((e) => e.id !== pinned && !hidden.set.has(e.id));

  if (filteredInterfaces.length === 0 && hidden.set.has(pinned)) {
    return (
      <Box height={rootHeight} display="flex" justifyContent="center" alignItems="center">
        <Typography
          variant="h2"
          component="p"
          sx={{ color: theme.palette.text.primary, textAlign: 'center' }}
        >
          Tous les pairs masqués (
          {interfaces.length}
          )
        </Typography>
      </Box>
    );
  }

  if (window.innerHeight > window.innerWidth) {
    const shownInterfaces = filteredInterfaces.length <= more.pinned.mobile
      ? filteredInterfaces
      : [
        ...[...filteredInterfaces].slice(0, more.pinned.mobile - 1),
        {
          id: uuidv4(),
          more: true,
          peers: filteredInterfaces.length - more.pinned.mobile + 1,
        },
      ];
    return (
      <Box
        className={classes.root}
        sx={{
          flexDirection: 'column',
          maxHeight: rootHeight,
          height: rootHeight,
          minHeight: rootHeight,
        }}
      >
        {filteredInterfaces.length > 0 && (
          <Row row={shownInterfaces} rootHeight={rootHeight} key={uuidv4()} />
        )}
        <Box className={classes.mobilePinned} key={uuidv4()}>
          <Box
            className={classes.peer}
            sx={{
              maxHeight: (rootHeight / 4) * 3,
              height: (rootHeight / 4) * 3,
              minHeight: (rootHeight / 4) * 3,
            }}
          >
            <UserInterface height={(rootHeight / 4) * 3} peer={pinnedInterface} />
          </Box>
        </Box>
      </Box>
    );
  }

  const shownInterfaces = filteredInterfaces.length <= more.pinned.desktop
    ? filteredInterfaces
    : [
      ...[...filteredInterfaces].slice(0, more.pinned.desktop - 1),
      {
        id: uuidv4(),
        more: true,
        peers: filteredInterfaces.length - more.pinned.desktop + 1,
      },
    ];

  return (
    <Box className={classes.root} sx={{ height: rootHeight }}>
      <Box className={classes.pinned} key={uuidv4()}>
        <Box
          className={classes.peer}
          sx={{ maxHeight: rootHeight, height: rootHeight, minHeight: rootHeight }}
        >
          <UserInterface height={rootHeight} peer={pinnedInterface} />
        </Box>
      </Box>
      {filteredInterfaces.length > 0 && (
        <Column column={shownInterfaces} rootHeight={rootHeight} key={uuidv4()} />
      )}
    </Box>
  );
}

export default UIPinned;
