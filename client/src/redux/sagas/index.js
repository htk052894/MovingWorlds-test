import { all } from 'redux-saga/effects'
import userSaga from "./userSaga"
import urlsSaga from "./urlsSaga"

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    userSaga(),
    urlsSaga()
  ])
}