import {takeEvery, put, call, select} from 'redux-saga/effects'
import {destroy} from 'utils/http'
import {
  DELETE_SNAPSHOT_PERSON,
  deletePersonSuccess,
  deletePersonFailure,
} from 'actions/personCardActions'
import {fetchRelationshipsByClientIds} from 'actions/relationshipsActions'
import {fetchHistoryOfInvolvementsByClientIds} from 'actions/historyOfInvolvementActions'
import {getClientIdsSelector} from 'selectors/clientSelectors'

export function* deleteSnapshotPerson({payload: {id}}) {
  try {
    yield call(destroy, `/api/v1/participants/${id}`)
    yield put(deletePersonSuccess(id))
    const clientIds = yield select(getClientIdsSelector)
    yield put(fetchRelationshipsByClientIds(clientIds))
    yield put(fetchHistoryOfInvolvementsByClientIds(clientIds))
  } catch (error) {
    yield put(deletePersonFailure(error.responseJSON))
  }
}
export function* deleteSnapshotPersonSaga() {
  yield takeEvery(DELETE_SNAPSHOT_PERSON, deleteSnapshotPerson)
}
