import {
  Box,
  DialogContent,
  TextField,
  InputAdornment,
  Avatar,
  Button,
  CircularProgress,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import Title from '@mui/icons-material/Title';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import uploadFile from '../../../actions/vault/uploadFile';

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
    minWidth: 300,
    alignItems: 'center',
  },
  button: {
    marginTop: 12,
    marginBottom: 16,
  },
  popover: {
    padding: theme.spacing(2),
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    fontSize: theme.spacing(4),
  },
}));

function Base() {
  const classes = useStyles();
  const fileInput = useRef();
  const loadingPicture = useSelector((state) => state.vault.loading);
  const createGroupPictureUrl = useSelector((state) => state.form.createGroupPictureUrl);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const title = useSelector((state) => state.form.createGroupTitle);

  return (
    <DialogContent dividers>
      <Box className={classes.buttons} flex={1} flexDirection="column" justifyContent="center">
        <Avatar alt={title || '-'} src={createGroupPictureUrl} className={classes.large} />
        <Button
          onClick={() => fileInput && fileInput.current && fileInput.current.click()}
          color="primary"
          className={classes.button}
        >
          {t('Photo')}
        </Button>
        {loadingPicture && <CircularProgress />}
        <TextField
          variant="filled"
          className={classes.margin}
          label={t('Nom du groupe')}
          value={title}
          onChange={(e) => dispatch({ type: 'create-group-title', title: e.target.value })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Title />
              </InputAdornment>
            ),
          }}
          sx={{
            background: '#000',
          }}
        />
        <input
          style={{
            visibility: 'hidden',
            width: 0,
            height: 0,
            padding: 0,
            margin: 0,
          }}
          type="file"
          ref={fileInput}
          accept="image/*"
          onChange={(e) => dispatch(uploadFile(e.target.files[0], { action: 'create-group-picture' }))}
        />
      </Box>
    </DialogContent>
  );
}

export default Base;
