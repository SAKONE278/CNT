import { DialogTitle } from '@mui/material';

import ArrowBack from '@mui/icons-material/ArrowBack';
import { useTranslation } from 'react-i18next';

function Title({ type, setType }) {
  const { t } = useTranslation();

  let title;

  switch (type) {
    case 'people':
      title = t('Trouver un Correspondant');
      break;
    case 'group':
    case 'group2':
      title = t('Nouveau Groupe');
      break;
    case 'meeting':
    case 'meeting2':
      title = t('Planifier une réunion');
      break;
    case 'meeting-details':
      title = t('Details de la réunion');
      break;
    default:
      title = t('Que voulez vous faire ?');
  }

  return (
    <DialogTitle id="customized-dialog-title">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {type && type !== 'base' && type !== 'meeting-details' && (
          <div
            style={{
              paddingRight: 6,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
            onClick={() => setType('base')}
          >
            <ArrowBack />
          </div>
        )}
        <div>{title}</div>
      </div>
    </DialogTitle>
  );
}

export default Title;
