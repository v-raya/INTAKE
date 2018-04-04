import {takeEvery, put} from 'redux-saga/effects'
import {clearSnapshot} from 'actions/snapshotActions'
import {CREATE_SNAPSHOT} from 'actions/actionTypes'
import {push} from 'react-router-redux'

export function* createSnapshot() {
  yield put(clearSnapshot())
  yield put(push('/snapshot'))
}
export function* createSnapshotSaga() {
  yield takeEvery(CREATE_SNAPSHOT, createSnapshot)
}
