import {takeEvery, put} from 'redux-saga/effects'
import {CREATE_SCREENING} from 'actions/actionTypes'
import {push} from 'react-router-redux'

export function* createScreening() {
  const screeningNewPath = '/screenings/new'
  yield put(push(screeningNewPath))
}
export function* createScreeningSaga() {
  yield takeEvery(CREATE_SCREENING, createScreening)
}
