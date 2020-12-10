import { call, put, takeLatest } from 'redux-saga/effects';
import API from "../../api/index";
import types from "../types";

function* newUrl(data) {
    try {
        const res = yield call(API.newUrl, data);
        yield put({
            type: types.SEND_NEW_URL,
            payload: res.data                     
        })
    }
    catch (error) {
        yield put({
            type: types.GET_ERRORS,
            payload: error.response.data
        })
    }
}

function* getAllUrls(userId) {
    try {
        const res = yield call(API.getAllUrls, { userId: userId });
        yield put ({
            type: types.SET_ALL_URLS,
            payload: res.data.allUrls
        })
    }
    catch (error) {
        yield put({
            type: types.GET_ERRORS,
            payload: error.response.data
        })
    }
}

function* clickShortCode(shortCode) {
    try {
        const res = yield call(API.clickShortCode, shortCode);
        window.open(res.data.fullUrl, "_blank");
    }
    catch (error) {
        yield put({
            type: types.GET_ERRORS,
            payload: error.response.data
        })
    }
}

export default function* urlsSaga() {
    yield takeLatest(types.SEND_NEW_URL, newUrl)
    yield takeLatest(types.CLICK_SHORT_CODE, clickShortCode)
    yield takeLatest(types.GET_ALL_URLS, getAllUrls)
}