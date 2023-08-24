import { useEffect, useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Grid,
  CircularProgress,
  Button,
  Tooltip,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import { Edit as EditIcon, Trash as TrashIcon } from 'react-feather';
import getInitials from '../../../utils/getInitials';
import DeleteDialog from './DeleteDialog';
import EditDialog from './EditDialog';
import DeleteManyDialog from './DeleteManyDialog';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2),
  },
}));

function Results({ className, ...rest }) {
  const classes = useStyles();
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteManyDialog, setDeleteManyDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const users = useSelector((state) => state.users.users || []);

  useEffect(() => {
    setSelectedUserIds([]);
  }, [users]);

  const selectedUsers = users.filter((e) => selectedUserIds.includes(e.id)) || [];

  const rootIds = users
    .slice(page * limit, page * limit + limit)
    .filter((e) => e.roles.includes('root'))
    .map((e) => e.id);
  const isRootShown = rootIds.length > 0;

  const currentLength = users.slice(page * limit, page * limit + limit).length;

  if (!users) {
    return (
      <Grid container justify="center" alignItems="center" style={{ height: '100%' }}>
        <CircularProgress />
      </Grid>
    );
  }

  if (users.length === 0) {
    return (
      <Grid container justify="center" alignItems="center" style={{ height: '100%' }}>
        <Typography variant="body1">No users to show for the selected filters.</Typography>
      </Grid>
    );
  }

  const handleSelectAll = () => {
    let newSelectedUserIds;

    if (selectedUserIds.length !== (isRootShown ? currentLength - 1 : currentLength)) {
      // eslint-disable-next-line max-len
      newSelectedUserIds = users
        .slice(page * limit, page * limit + limit)
        .filter((e) => !e.roles.includes('root'))
        .map((user) => user.id);
    } else {
      newSelectedUserIds = [];
    }

    setSelectedUserIds(newSelectedUserIds);
  };

  const handleSelectOne = (event, id) => {
    if (selectedUserIds.includes(id)) {
      const selection = [...selectedUserIds];
      selection.splice(selection.indexOf(id), 1);
      setSelectedUserIds(selection);
    } else {
      setSelectedUserIds([...selectedUserIds, id]);
    }
  };

  const handleLimitChange = (event) => {
    setSelectedUserIds([]);
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setSelectedUserIds([]);
    setPage(newPage);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table style={{ overflowX: 'scroll' }}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={
                      selectedUserIds.length === (isRootShown ? currentLength - 1 : currentLength)
                      && selectedUserIds.length > 1
                    }
                    color="primary"
                    indeterminate={
                      selectedUserIds.length > 0
                      && selectedUserIds.length < (isRootShown ? currentLength - 1 : currentLength)
                    }
                    onChange={handleSelectAll}
                    disabled={(isRootShown ? currentLength - 1 : currentLength) === 0}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Quick Actions</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Roles</TableCell>
                <TableCell>Last login</TableCell>
                <TableCell>Registration date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.slice(page * limit, page * limit + limit).map((user) => (
                <TableRow hover key={user.id} selected={selectedUserIds.includes(user.id)}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedUserIds.includes(user.id)}
                      onChange={(event) => handleSelectOne(event, user.id)}
                      value="true"
                      disabled={user.roles.includes('root')}
                    />
                  </TableCell>
                  <TableCell>
                    <Box alignItems="center" display="flex">
                      <Avatar className={classes.avatar} src={user.picture ? user.picture.littleThumbnailUrl : null}>
                        {getInitials(user.fullName)}
                      </Avatar>
                      <Typography color="textPrimary" variant="body1">
                        {user.fullName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell width={170}>
                    <Tooltip title="Edit" arrow placement="top">
                      <Button
                        color="primary"
                        variant="contained"
                        style={{ height: 36, marginRight: 6 }}
                        onClick={() => {
                          setSelectedUser(user);
                          setEditDialog(true);
                        }}
                        disabled={user.roles.includes('root')}
                      >
                        <EditIcon size={16} />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Delete" arrow placement="top">
                      <Button
                        color="primary"
                        variant="contained"
                        style={{ height: 36 }}
                        onClick={() => {
                          setSelectedUser(user);
                          setDeleteDialog(true);
                        }}
                        disabled={user.roles.includes('root')}
                      >
                        <TrashIcon size={16} />
                      </Button>
                    </Tooltip>
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.roles.join(', ')}</TableCell>
                  <TableCell>{moment(user.lastLogin).format('D/M/YYYY h:mm a')}</TableCell>
                  <TableCell>{moment(user.registrationDate).format('D/M/YYYY h:mm a')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box display="flex" flexDirection="row" alignItems="center">
        {selectedUserIds.length > 0 && (
          <Box ml={2}>
            <Button color="primary" variant="contained" size="small" onClick={() => setDeleteManyDialog(true)}>
              Delete
              {' '}
              {`(${selectedUserIds.length})`}
            </Button>
          </Box>
        )}
        <Box flexGrow={1}>
          <TablePagination
            component="div"
            count={users.length}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Box>
      </Box>
      <DeleteDialog open={deleteDialog} setOpen={setDeleteDialog} user={selectedUser} />
      {/* eslint-disable-next-line max-len */}
      <DeleteManyDialog open={deleteManyDialog} setOpen={setDeleteManyDialog} users={selectedUsers} />
      <EditDialog open={editDialog} setOpen={setEditDialog} user={selectedUser} />
    </Card>
  );
}

export default Results;
