import React, { createContext, useContext, useReducer } from "react";

import { LOGIN_USER, SIGNOUT_USER } from "./types";

export const Context = (() => {
  let currentUser = null;
  let isAuth = false;

  const token = localStorage.getItem("token");
  if (token) {
    currentUser = token;
    isAuth = true;
  }

  return createContext({
    currentUser,
    isAuth,
  });
})();

export const Reducer = (state, { type, payload }) => {
  switch (type) {
    case LOGIN_USER:
      return {
        currentUser: payload,
        isAuth: true,
      };

    case SIGNOUT_USER:
      return {
        currentUser: null,
        isAuth: false,
      };

    default:
      return state;
  }
};

export const Provider = ({ children }) => {
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
