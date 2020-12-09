import { combineReducers } from 'redux';
import authReducer from "./authReducers"
import urlReducer from "./urlReducers"
import errorReducer from "./errorReducer"

const rootReducer = combineReducers({
  auth: authReducer,
  urls: urlReducer,
  errors: errorReducer,
});

export default rootReducer;