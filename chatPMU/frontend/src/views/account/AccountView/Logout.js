import { useState } from 'react';
import clsx from 'clsx';
import {
  Button, Card, CardActions, Dialog, DialogActions, DialogContent, DialogTitle,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import DialogContentText from '@mui/material/DialogContentText';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logout from '../../../actions/auth/logout';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100,
  },
}));

function Profile({ className, ...rest }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardActions>
        <Button color="primary" fullWidth variant="text" onClick={() => setOpen(true)}>
          {t('Déconnexion')}
        </Button>
      </CardActions>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{t('Confirmation')}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{t('Etes vous sur de vouloir quitter?')}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            {t('Cancel')}
          </Button>
          <Button onClick={() => dispatch(logout({ navigate }))} color="primary">
            {t('Déconnexion')}
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default Profile;
