import Box from '@mui/material/Box';
import logo from '../assets/clover-logo.png';

function Logo(props) {
  return (
    <Box display="flex" alignItems="center">
      <img alt="Clover" src={logo} style={{ width: 45, height: 100 / 2.6 }} {...props} />
    </Box>
  );
}

export default Logo;
