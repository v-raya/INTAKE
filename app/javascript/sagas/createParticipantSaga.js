import {takeLatest, put, call, select} from 'redux-saga/effects'
import {delay} from 'redux-saga'
import {STATUS_CODES, post} from 'utils/http'
import {
  CREATE_PERSON,
  createPersonSuccess,
  createPersonFailure,
} from 'actions/personCardActions'
import {fetchHistoryOfInvolvements} from 'actions/historyOfInvolvementActions'
import {fetchRelationships} from 'actions/relationshipsActions'
import {getScreeningIdValueSelector} from 'selectors/screeningSelectors'

export function* createParticipant({payload: {person, delayed = 0}}) {
  try {
    const {screening_id, legacy_descriptor} = person
    const {legacy_id, legacy_table_name} = legacy_descriptor || {}
    const TIME_TO_DEBOUNCE = delayed
    if (delayed !== 0) {
      yield call(delay, TIME_TO_DEBOUNCE)
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
    const screeningId = yield select(getScreeningIdValueSelector)
    yield put(fetchRelationships('screenings', screeningId))
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
