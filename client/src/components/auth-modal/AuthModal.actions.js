import actionTypes from "./AuthModal.types";

export const setUser = payload => ({
  type: actionTypes.SET_USER,
  payload
});

export const logout = () => ({
  type: actionTypes.LOGOUT
});