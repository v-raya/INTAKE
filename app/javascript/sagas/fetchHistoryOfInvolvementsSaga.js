import {takeLatest, put, call} from 'redux-saga/effects'
import {get} from 'utils/http'
import {
  fetchHistoryOfInvolvementsSuccess,
  fetchHistoryOfInvolvementsFailure,
} from 'actions/historyOfInvolvementActions'
import {
  FETCH_HISTORY_OF_INVOLVEMENTS,
} from 'actions/actionTypes'

function* fetchHistoryForUnitOfWork(type, id) {
  try {
    const response = yield call(get, `/api/v1/${type}/${id}/history_of_involvements`)
    yield put(fetchHistoryOfInvolvementsSuccess(response))
  } catch (error) {
    yield put(fetchHistoryOfInvolvementsFailure(error.responseJSON))
  }
}

function* fetchHistoryForClients(ids) {
  try {
    const response = yield call(get, `/api/v1/history_of_involvements?clientIds=${ids.join(',')}`)
    yield put(fetchHistoryOfInvolvementsSuccess(response))
  } catch (error) {
    yield put(fetchHistoryOfInvolvementsFailure(error.responseJSON))
  }
}

export function fetchHistoryOfInvolvements({payload: {type, id, ids}}) {
  if (type === 'clients') {
    return fetchHistoryForClients(ids)
  }
  return fetchHistoryForUnitOfWork(type, id)
}
export function* fetchHistoryOfInvolvementsSaga() {
  yield takeLatest(FETCH_HISTORY_OF_INVOLVEMENTS, fetchHistoryOfInvolvements)
}
