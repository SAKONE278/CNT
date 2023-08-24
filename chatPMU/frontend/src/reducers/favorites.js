const initialState = {
  list: [],
  search: '',
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'search':
      return {
        ...state,
        search: (action.search || '').toLowerCase(),
      };
    case 'favorites-loading':
      return {
        ...state,
        loading: action.loading,
      };
    case 'favorites-list':
      return {
        ...state,
        list: action.list,
      };
    default:
      return state;
  }
};

export default reducer;
