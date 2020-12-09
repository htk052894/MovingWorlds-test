import types from "../types"

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ERRORS:
      return action.payload
    default:
      return state
  }
}
