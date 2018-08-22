import {takeEvery, put, call, select} from 'redux-saga/effects'
import {CREATE_SCREENING} from 'actions/actionTypes'
import {push} from 'react-router-redux'
import {logEvent} from 'utils/analytics'
import {getStaffIdSelector} from 'selectors/userInfoSelectors'

export function* createScreening() {
  const screeningNewPath = '/screenings/new'
  yield put(push(screeningNewPath))
  const staffId = yield select(getStaffIdSelector)
  yield call(logEvent, 'StartScreening', {
    staffId: staffId,
  })
}
export function* createScreeningSaga() {
  yield takeEvery(CREATE_SCREENING, createScreening)
}
