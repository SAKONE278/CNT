const initialState = {
  severity: 'info',
  autoHideDuration: 5000,
  open: false,
  content: '',
};

const reducer = (state = initialState, action) => {
  if (
    action.type.startsWith('snack')
    && !['error', 'warning', 'info', 'success'].includes(action.severity)
  ) {
    action.severity = 'info';
  }
  switch (action.type) {
    case 'snack':
      return {
        ...state,
        severity: action.severity || state.severity,
        autoHideDuration: action.autoHideDuration || state.autoHideDuration,
        open: true,
        content: action.content,
      };
    case 'snack-out':
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
};

export default reducer;
