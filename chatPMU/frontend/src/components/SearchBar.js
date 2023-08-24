import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { TextField } from '@mui/material';
import isEmpty from '../utils/isEmpty';

const useStyles = makeStyles((theme) => ({
  searchBar: {
    backgroundColor: theme.palette.background.paper,
  },
  input: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    width: '100%',
  },
}));

function SearchBar({ setTab, tab }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <div className={classes.searchBar}>
      <TextField
        color="primary"
        className={classes.input}
        label={t('Recherche')}
        variant="filled"
        type="text"
        sx={{
          background: '#000',
        }}
        onChange={(e) => {
          dispatch({ type: 'search', search: e.target.value });
          if (isEmpty(e.target.value) && tab === 1) {
            setTab(0);
          }
          if (!isEmpty(e.target.value) && tab === 0) {
            setTab(1);
          }
        }}
      />
    </div>
  );
}

export default SearchBar;
