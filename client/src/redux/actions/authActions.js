import types from "../types";

export const loginUser = (userData) => ({
  type: types.LOGIN_USER,
  userData
});

export const logOutUser = () => ({
  type: types.LOGOUT_USER
});

export const setCurrentUser = (json) => ({
  type: types.SET_CURRENT_USER,
  json
});

export const registerUser = (userData) => ({
  type: types.REGISTER_USER,
  userData
});
