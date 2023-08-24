import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import getUsers from '../../../actions/users/getUsers';
import Results from './Results';
import Toolbar from './Toolbar';
import data from './data';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100%',
    width: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

function CustomerListView() {
  const classes = useStyles();
  const [users] = useState(data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers({}));
  });

  return (
    <Box px={2} flexDirection="column" className={classes.root}>
      <Toolbar />
      <Box mt={3}>
        <Results users={users} />
      </Box>
    </Box>
  );
}

export default CustomerListView;
