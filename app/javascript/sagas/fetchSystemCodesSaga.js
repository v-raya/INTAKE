import {takeEvery, put} from 'redux-saga/effects'
import {fetchSuccess, fetchFailure, FETCH_SYSTEM_CODES} from 'actions/systemCodesActions'
import LOV from 'data/lov/lov'

export function* fetchSystemCodes() {
  try {
    const response = LOV
    yield put(fetchSuccess(response))
  } catch (error) {
    yield put(fetchFailure(error))
  }
}

export function* fetchSystemCodesSaga() {
  yield takeEvery(FETCH_SYSTEM_CODES, fetchSystemCodes)
}
