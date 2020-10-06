import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  user: {},
  token: "",
  isAuthenticated: false,
  products: [],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function addUser(user) {
    dispatch({
      type: "ADD_USER",
      payload: user,
    });
  }
  function addToken(token) {
    dispatch({
      type: "ADD_TOKEN",
      payload: token,
    });
  }

  function authenticate(auth) {
    dispatch({
      type: "AUTHENTICATE",
      payload: auth,
    });
  }
  function addProducts(products) {
    dispatch({
      type: "ADD_PRODUCTS",
      payload: products,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        products: state.products,
        addUser,
        addToken,
        authenticate,
        addProducts,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
