import types from "../types"
import isEmpty from "../../utils/isEmpty"

const initialState = {
  isAuthenticated: false,
  user: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CURRENT_USER:
      alert("I am checking here reducer");
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      }
    default:
      return state
  }
}
