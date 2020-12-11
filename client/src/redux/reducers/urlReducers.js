import types from "../types"

const initialState = {
  allUrls: [],
  shortCode: "",
  urlStats: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ALL_URLS:
      return {
        ...state,
        allUrls: action.payload.reverse(),
      }
    case types.GET_NEW_URL:
      return {
        ...state,
        allUrls: [action.payload, ...state.allUrls],
      }
    case types.SET_SHORT_CODE:
      return {
        ...state,
        shortCode: action.code
      }
    case types.SET_STATS:
      return {
        ...state,
        urlStats: action.payload
      }
    default:
      return state
  }
}
