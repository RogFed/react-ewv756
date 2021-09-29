import React, { createContext, useReducer } from 'react';

import store from '../store';
import reducer from '../reducers';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, store);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider as default, AppContext };
