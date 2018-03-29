import {takeEvery, put, call} from 'redux-saga/effects'
import {get} from 'utils/http'
import {
  fetchRelationshipsSuccess,
  fetchRelationshipsFailure,
} from 'actions/relationshipsActions'
import {
  FETCH_RELATIONSHIPS,
} from 'actions/actionTypes'

function* fetchRelationshipsForUnitOfWork(type, id) {
  try {
    const response = yield call(get, `/api/v1/${type}/${id}/relationships`)
    yield put(fetchRelationshipsSuccess(response))
  } catch (error) {
    yield put(fetchRelationshipsFailure(error.responseJSON))
  }
}

function* fetchRelationshipsForClients(ids) {
  try {
    const response = yield call(get, `/api/v1/relationships?clientIds=${ids.join(',')}`)
    yield put(fetchRelationshipsSuccess(response))
  } catch (error) {
    yield put(fetchRelationshipsFailure(error.responseJSON))
  }
}

export function fetchRelationships({payload: {type, id, ids}}) {
  if (type === 'clients') {
    return fetchRelationshipsForClients(ids)
  }
  return fetchRelationshipsForUnitOfWork(type, id)
}
export function* fetchRelationshipsSaga() {
  yield takeEvery(FETCH_RELATIONSHIPS, fetchRelationships)
}
