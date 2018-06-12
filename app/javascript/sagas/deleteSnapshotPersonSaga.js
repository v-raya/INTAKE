import {takeEvery, put, select} from 'redux-saga/effects'
import {
  DELETE_SNAPSHOT_PERSON,
  deletePersonSuccess,
} from 'actions/personCardActions'
import {fetchRelationships} from 'actions/relationshipsActions'
import {fetchHistoryOfInvolvementsByClientIds} from 'actions/historyOfInvolvementActions'
import {selectClientIds} from 'selectors/participantSelectors'

export function* deleteSnapshotPerson({payload: {id}}) {
  yield put(deletePersonSuccess(id))
  const clientIds = yield select(selectClientIds)
  yield put(fetchRelationships(clientIds))
  yield put(fetchHistoryOfInvolvementsByClientIds(clientIds))
}
export function* deleteSnapshotPersonSaga() {
  yield takeEvery(DELETE_SNAPSHOT_PERSON, deleteSnapshotPerson)
}
