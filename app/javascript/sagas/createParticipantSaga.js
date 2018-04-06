import {takeLatest, put, call, select} from 'redux-saga/effects'
import {delay} from 'redux-saga'
import {STATUS_CODES, post} from 'utils/http'
import {
  CREATE_PERSON,
  createPersonSuccess,
  createPersonFailure,
} from 'actions/personCardActions'
import {fetchHistoryOfInvolvements} from 'actions/historyOfInvolvementActions'
import {fetchRelationshipsByClientIds} from 'actions/relationshipsActions'
import {getClientIdsSelector} from 'selectors/clientSelectors'
import {getScreeningIdValueSelector} from 'selectors/screeningSelectors'

export function* createParticipant({payload: {person, delayed = 0}}) {
  try {
    const {screening_id, legacy_descriptor} = person
    const {legacy_id, legacy_table_name} = legacy_descriptor || {}
    // The delay is quick fix for now but ideally we don't want this to be the solution. Will be resolved in near future with redux state.
    if (delayed !== 0) {
      yield call(delay, delayed)
    }
    const response = yield call(post, '/api/v1/participants', {
      participant: {
        screening_id,
        legacy_descriptor: {
          legacy_id,
          legacy_table_name,
        },
      },
    })
    yield put(createPersonSuccess(response))
    const clientIds = yield select(getClientIdsSelector)
    yield put(fetchRelationshipsByClientIds(clientIds))
    const screeningId = yield select(getScreeningIdValueSelector)
    yield put(fetchHistoryOfInvolvements('screenings', screeningId))
  } catch (error) {
    if (error.status === STATUS_CODES.forbidden) {
      yield call(alert, 'You are not authorized to add this person.')
    } else {
      yield put(createPersonFailure(error.responseJSON))
    }
  }
}
export function* createParticipantSaga() {
  yield takeLatest(CREATE_PERSON, createParticipant)
}
