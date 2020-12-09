import { call, put, takeLatest } from 'redux-saga/effects';
import setAuthToken from "../../utils/setTokenOnAllRoutes";
import jwt_decode from "jwt-decode";
import API from "../../api/index";
import types from "../types";

function* loginUser(userData) {
    try {
        const res = yield call(API.loginUser, userData.userData);
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        
        setCurrentUser(decoded);
    }
    catch (error) {
        yield put({
            type: types.GET_ERRORS,
            payload: error.response.data
        })
    }

}
// eslint-disable-next-line
function* logOutUser() {    
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    setCurrentUser({});
}

function* setCurrentUser(decode) {
    alert("I am checking here saga");
    yield put({
        type: types.SET_CURRENT_USER,
        payload: decode
    })
}

function* registerUser(userData, history) {
    try {
        yield call(API.registerUser, userData.userData);
        history.push("/");
        const loginDetail = {
            email: userData.email,
            password: userData.password
        }
        const res = yield call(API.loginUser, loginDetail);
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        
        setCurrentUser(decoded);        
    }
    catch (error) {
        yield put({
            type: types.GET_ERRORS,
            payload: error.response
        })
    }    
}

export default function* userSaga() {
    yield takeLatest(types.LOGIN_USER, loginUser)
    yield takeLatest(types.LOGOUT_USER, logOutUser)
    yield takeLatest(types.REGISTER_USER, registerUser)
    yield takeLatest(types.SET_CURRENT_USER, setCurrentUser);
}