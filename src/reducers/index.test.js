import reducer from './index';

const initialState = {
  users: [],
  term: '',
  sort: 'asc',
};

test('Returns state with correct updated term', () => {
  const action = {
    type: 'UPDATE_TERM',
    payload: 'term',
  };
  expect(reducer(initialState, action)).toEqual({
    ...initialState,
    term: action.payload,
  });
});
