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
        yield put({
            type: types.SET_CURRENT_USER,
            payload: decoded
        })
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
    yield put({
        type: types.SET_CURRENT_USER,
        payload: {}
    })
}

function* registerUser(userData, history) {
    try {
        yield call(API.registerUser, userData.userData);
        const loginDetail = {
            email: userData.userData.email,
            password: userData.userData.password
        }
        const res = yield call(API.loginUser, loginDetail);
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        
        yield put({
            type: types.SET_CURRENT_USER,
            payload: decoded
        })        
    }
    catch (error) {
        yield put({
            type: types.GET_ERRORS,
            payload: error.response.data
        })
    }    
}

export default function* userSaga() {
    yield takeLatest(types.LOGIN_USER, loginUser)
    yield takeLatest(types.LOGOUT_USER, logOutUser)
    yield takeLatest(types.REGISTER_USER, registerUser)
}