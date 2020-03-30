import React from "react";

export const GlobalStateContext = React.createContext();
export const GlobalDispatchContext = React.createContext();

const initialState = {
  user: "test",
};

function reducer(state, action) {
  switch (action.type) {
    case "USER": {
      return {
        ...state,
        user: "test!",
      };
    }

    default:
      throw new Error("Not good");
  }
}

const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>{children}</GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};

export default GlobalContextProvider;
