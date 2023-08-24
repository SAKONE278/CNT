import {
  Box, Divider, List, Typography,
} from '@mui/material';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import PeopleIcon from '@mui/icons-material/People';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import NavItem from './NavItem';
import config from '../../config';

const useStyles = makeStyles((theme) => ({
  sidebar: {
    width: 300,
    minWidth: 300,
    background: theme.palette.background.paper,
  },
  container: {
    overflowY: 'hidden',
    flex: 1,
    height: '100%',
    width: '100%',
  },
  listContainer: {
    flex: 1,
    overflowY: 'auto',
  },
  loadingContainer: {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    justifyContent: 'center',
  },
}));

const items = [
  {
    href: '/admin/dashboard',
    icon: QueryStatsIcon,
    title: 'Dashboard',
    admin: false,
  },
  {
    href: '/admin/users',
    icon: PeopleIcon,
    title: 'Users',
    admin: true,
  },
];

function AdminNavBar() {
  const classes = useStyles();
  return (
    <Box height="100%" display="flex" flexDirection="column" className={classes.sidebar}>
      <Box py={1} px={2} style={{ textAlign: 'center' }}>
        <Typography align="center" variant="body1" color="textPrimary">
          ADMIN PANEL
        </Typography>
      </Box>
      <Divider />
      <Box px={3} py={0.5}>
        <List>
          {items.map((item) => (
            <NavItem href={item.href} key={item.title} title={item.title} icon={item.icon} />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
      <Divider />
      <Box py={1} px={2} style={{ textAlign: 'center' }}>
        <Typography align="center" variant="caption" color="textPrimary">
          Clover &copy;
          {' '}
          {moment().format('YYYY')}
          {' '}
          - v
          {config.version}
          &nbsp;(
          {config.build}
          )
        </Typography>
      </Box>
    </Box>
  );
}

export default AdminNavBar;
