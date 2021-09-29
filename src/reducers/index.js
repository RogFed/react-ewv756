const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'UPDATE_USERS':
      return { ...state, users: payload };
    case 'UPDATE_TERM':
      return { ...state, term: payload };
    case 'UPDATE_SORT':
      return { ...state, sort: payload };
    default:
      return state;
  }
};

export default reducer;
