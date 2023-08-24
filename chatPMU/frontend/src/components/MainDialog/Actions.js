import { Button, DialogActions } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import createGroup from '../../actions/rooms/createGroup';
import remove from '../../actions/events/remove';

function Actions({ type, setOpen, setType }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const form = useSelector((state) => state.form);
  const navigate = useNavigate();

  switch (type) {
    case 'contacts':
      return (
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            {t('Fermer')}
          </Button>
        </DialogActions>
      );
    case 'people':
      return (
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            {t('Fermer')}
          </Button>
        </DialogActions>
      );
    case 'group':
      return (
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            {t('Fermer')}
          </Button>
          <Button onClick={() => setType('group2')} color="primary">
            {t('Suivant')}
          </Button>
        </DialogActions>
      );
    case 'group2':
      return (
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            {t('Fermer')}
          </Button>
          <Button
            onClick={() => {
              if (!form.createGroupTitle) {
                dispatch({
                  type: 'snack',
                  content: 'group title required',
                  severity: 'error',
                });
                return;
              }
              dispatch(
                createGroup({
                  title: form.createGroupTitle,
                  picture: form.createGroupPicture,
                  users: form.createGroupSelection,
                  navigate,
                }),
              );
              setOpen(false);
            }}
            color="primary"
          >
            {t('Créer')}
          </Button>
        </DialogActions>
      );
    case 'meeting-details':
      return (
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            {t('Fermer')}
          </Button>
          <Button
            onClick={() => {
              dispatch(remove({ id: form.meetingDetails._id }));
              setOpen(false);
            }}
            color="primary"
          >
            {t('Supprimer')}
          </Button>
          <Button
            onClick={() => {
              navigate(`/meeting/${form.meetingDetails.meeting}/join`);
              setOpen(false);
            }}
            color="primary"
          >
            {t('Joindre')}
          </Button>
        </DialogActions>
      );
    default:
      return (
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            {t('Fermer')}
          </Button>
        </DialogActions>
      );
  }
}

export default Actions;
