import {fromJS} from 'immutable'
import {takeEvery, put, call, select} from 'redux-saga/effects'
import {STATUS_CODES, get} from 'utils/http'
import {
  CREATE_SNAPSHOT_PERSON,
  createPersonSuccess,
  createPersonFailure,
} from 'actions/personCardActions'
import {fetchHistoryOfInvolvementsByClientIds} from 'actions/historyOfInvolvementActions'
import {fetchRelationships} from 'actions/relationshipsActions'
import {selectClientIds} from 'selectors/participantSelectors'
import {mapDoraPersonToParticipant} from 'utils/peopleSearchHelper'

export function* createSnapshotPerson({payload: {id}}) {
  try {
    const response = yield call(get, `/api/v1/people/${id}`)
    const state = yield select()
    const participant = mapDoraPersonToParticipant(state, fromJS(response)).toJS()
    yield put(createPersonSuccess(participant))
    const clientIds = yield select(selectClientIds)
    yield put(fetchRelationships(clientIds))
    yield put(fetchHistoryOfInvolvementsByClientIds(clientIds))
  } catch (error) {
    if (error.status === STATUS_CODES.forbidden) {
      yield call(alert, 'You are not authorized to add this person.')
    } else {
      yield put(createPersonFailure(error.responseJSON))
    }
  }
}
export function* createSnapshotPersonSaga() {
  yield takeEvery(CREATE_SNAPSHOT_PERSON, createSnapshotPerson)
}
