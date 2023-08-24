import { useState } from 'react';
import clsx from 'clsx';
import {
  Box, Button, Card, CardContent, TextField, InputAdornment, SvgIcon,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Search as SearchIcon } from 'react-feather';
import { CSVLink } from 'react-csv';
import getUsers from '../../../actions/users/getUsers';
import exportData from '../../../utils/exportData';
import CreateDialog from './CreateDialog';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1),
  },
  exportButton: {
    marginRight: theme.spacing(1),
  },
}));

function Toolbar({ className, ...rest }) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const customers = useSelector((state) => state.users.users);

  const [createDialog, setCreateDialog] = useState(false);

  const csvData = [['first name', 'last name', 'username', 'email', 'registration date']];

  if (customers) {
    customers.forEach((e) => {
      csvData.push([e.firstName, e.lastName, e.username, e.email, e.registrationDate]);
    });
  }

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display="flex" justifyContent="flex-end">
        <CSVLink data={csvData} filename="users.csv">
          <Button className={classes.exportButton}>Export CSV</Button>
        </CSVLink>
        <Button className={classes.exportButton} onClick={() => exportData(customers)}>
          Export Data
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            setCreateDialog(true);
          }}
        >
          Add new user
        </Button>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent style={{ paddingBottom: 16 }}>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Box width={500}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon fontSize="small" color="action">
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Search users"
                  variant="outlined"
                  onChange={(e) => dispatch(getUsers({ text: e.target.value }))}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <CreateDialog open={createDialog} setOpen={setCreateDialog} />
    </div>
  );
}

export default Toolbar;
