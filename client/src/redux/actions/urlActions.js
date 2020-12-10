import types from "../types";

export const newUrl = (payload) => ({
  type: types.SEND_NEW_URL,
  payload
});

export const generateCode = () => ({
  type: types.GENERATE_SHORT_CODE
});

export const setCode = (code) => ({
  type: types.SET_SHORT_CODE,
  code
});

export const getAllUrls = (userId) => ({
  type: types.GET_ALL_URLS,
  userId
});

export const setAllUrls = (payload) => ({
  type: types.SET_ALL_URLS,
  payload
});

export const clickShortCode = (shortCode) => ({
  type: types.CLICK_SHORT_CODE,
  shortCode
});