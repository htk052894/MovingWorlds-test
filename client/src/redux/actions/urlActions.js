import types from "../types";

export const newUrl = (payload) => ({
  type: types.SEND_NEW_URL,
  payload
});

export const getAllUrls = (userId) => ({
  type: types.GET_ALL_URLS,
  userId
});

export const clickShortCode = (shortCode) => ({
  type: types.CLICK_SHORT_CODE,
  shortCode
});