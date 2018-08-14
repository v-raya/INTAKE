import {takeLatest, put, call, select} from 'redux-saga/effects'
import {get} from 'utils/http'
import {
  fetchRelationshipsSuccess,
  fetchRelationshipsFailure,
} from 'actions/relationshipsActions'
import {
  FETCH_RELATIONSHIPS,
} from 'actions/actionTypes'
import {clearTime} from 'actions/personCardActions'
import moment from 'moment'
import {getPersonCreatedAtTimeSelector} from 'selectors/peopleSearchSelectors'
import {logEvent} from 'utils/analytics'

export function* fetchRelationships({payload: {ids, screeningId}}) {
  try {
    const response = yield call(get, `/api/v1/relationships?clientIds=${ids.join(',')}&screeningId=${screeningId}`)
    yield put(fetchRelationshipsSuccess(response))
    const personCreatedAtTime = yield select(getPersonCreatedAtTimeSelector)
    const fetchRelationshipTime = moment().valueOf()
    if (personCreatedAtTime) {
      const relationshipsQueryCycleTime = fetchRelationshipTime - personCreatedAtTime
      yield call(logEvent, 'relationshipsQueryCycleTime', {
        relationshipsQueryCycleTime: relationshipsQueryCycleTime,
      })
      yield put(clearTime())
    }
  } catch (error) {
    yield put(fetchRelationshipsFailure(error.responseJSON))
  }
}

export function* fetchRelationshipsSaga() {
  yield takeLatest(FETCH_RELATIONSHIPS, fetchRelationships)
}
