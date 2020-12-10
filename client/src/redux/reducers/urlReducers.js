import types from "../types"

const initialState = {
  allUrls: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ALL_URLS:
      return {
        ...state,
        allUrls: action.payload.reverse(),
      }
    case types.SEND_NEW_URL:
      return {
        ...state,
        allUrls: [action.payload, ...state.allUrls],
      }
    default:
      return state
  }
}
