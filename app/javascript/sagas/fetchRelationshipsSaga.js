import {takeLatest, put, call} from 'redux-saga/effects'
import {get} from 'utils/http'
import {
  fetchRelationshipsSuccess,
  fetchRelationshipsFailure,
} from 'actions/relationshipsActions'
import {
  FETCH_RELATIONSHIPS,
} from 'actions/actionTypes'

export function* fetchRelationships({payload: {ids}}) {
  try {
    const response = yield call(get, `/api/v1/relationships?clientIds=${ids.join(',')}`)
    yield put(fetchRelationshipsSuccess(response))
  } catch (error) {
    yield put(fetchRelationshipsFailure(error.responseJSON))
  }
}

export function* fetchRelationshipsSaga() {
  yield takeLatest(FETCH_RELATIONSHIPS, fetchRelationships)
}
