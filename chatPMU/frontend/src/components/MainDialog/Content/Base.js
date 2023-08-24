import { Box, Button, DialogContent } from '@mui/material';
import { makeStyles } from '@mui/styles';
import EmojiPeople from '@mui/icons-material/EmojiPeople';
import GroupAdd from '@mui/icons-material/GroupAdd';

import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.deep,
    color: theme.palette.primary.deep,
  },
  avatar: {
    width: 42,
    height: 42,
  },
  spacer: {
    width: 24,
    height: 42,
  },
  buttons: {
    display: 'flex',
  },
  button: {
    margin: 8,
    flexGrow: 1,
  },
  popover: {
    padding: theme.spacing(2),
  },
}));

function Base({ setType }) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <DialogContent dividers>
      <Box className={classes.buttons} flex={1} flexDirection="column" justifyContent="center">
        <Box mb={2} display="flex" justifyContent="center">
          <Button
            className={classes.button}
            variant="contained"
            onClick={() => setType('people')}
            color="primary"
            size="large"
          >
            <EmojiPeople />
            &nbsp;
            {t('dialogBaseFindPeople')}
          </Button>
        </Box>
        <Box mb={2} display="flex" justifyContent="center">
          <Button
            className={classes.button}
            variant="contained"
            onClick={() => setType('group')}
            color="primary"
            size="large"
          >
            <GroupAdd />
            &nbsp;
            {t('dialogBaseCreateAGroup')}
          </Button>
        </Box>
      </Box>
    </DialogContent>
  );
}

export default Base;
