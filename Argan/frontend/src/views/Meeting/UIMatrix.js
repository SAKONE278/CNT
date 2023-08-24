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
  column: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
  },
  row: {
    flex: 0,
  },
}));

function Peer({ peer, items, rootHeight }) {
  const classes = useStyles();
  const itemHeight = (rootHeight / items) * (peer.span || 1);
  return (
    <Box
      className={classes.row}
      sx={{ maxHeight: itemHeight, height: itemHeight, minHeight: itemHeight }}
    >
      <UserInterface height={itemHeight} peer={peer} />
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
    <Box className={classes.column} key={column}>
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

function UIMatrix() {
  const theme = useTheme();
  const classes = useStyles();
  const interfaces = useSelector((state) => state.media.interfaces);
  const hidden = useSelector((state) => state.media.settings.hidden);
  const more = useSelector((state) => state.media.settings.more);
  const { height, width } = Utils.useWindowDimensions();

  const rootHeight = height - (width < 600 ? 56 : 64);

  const filteredInterfaces = interfaces.filter((e) => !hidden.set.has(e.id));

  const shownInterfaces = filteredInterfaces.length <= more.matrix
    ? filteredInterfaces
    : [
      ...[...filteredInterfaces].slice(0, more.matrix - 1),
      {
        id: uuidv4(),
        more: true,
        peers: filteredInterfaces.length - more.matrix + 1,
      },
    ];

  if (filteredInterfaces.length === 0) {
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

  let radix;
  if (window.innerWidth > window.innerHeight) {
    radix = Math.floor(Math.sqrt(shownInterfaces.length || 1));
  } else {
    radix = Math.ceil(Math.sqrt(shownInterfaces.length || 1));
  }
  const columns = Math.ceil(shownInterfaces.length / radix);
  const remainder = shownInterfaces.length % radix;

  const matrix = [];

  for (let i = 0; i < columns; i++) {
    matrix[i] = [];
    for (let j = 0; j < radix; j++) {
      if (i === columns - 1 && j === radix - remainder - 1) {
        matrix[i][j] = { ...shownInterfaces[i * radix + j], span: remainder + 1 };
      } else if (i === columns - 1 && j > radix - remainder - 1) {
        // do nothing
      } else {
        matrix[i][j] = shownInterfaces[i * radix + j];
      }
    }
  }

  return (
    <Box className={classes.root} sx={{ height: rootHeight }}>
      {matrix.map((column) => {
        return <Column column={column} rootHeight={rootHeight} key={uuidv4()} />;
      })}
    </Box>
  );
}

export default UIMatrix;
