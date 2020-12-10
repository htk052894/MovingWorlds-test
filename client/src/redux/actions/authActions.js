import types from "../types";

export const loginUser = (userData) => ({
  type: types.LOGIN_USER,
  userData
});

export const logOutUser = () => ({
  type: types.LOGOUT_USER
});

export const setCurrentUser = (payload) => ({
  type: types.SET_CURRENT_USER,
  payload
});

export const registerUser = (userData) => ({
  type: types.REGISTER_USER,
  userData
});
