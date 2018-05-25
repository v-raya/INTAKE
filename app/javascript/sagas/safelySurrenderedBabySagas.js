import {takeEvery, select, put} from 'redux-saga/effects'
import {SAVE_SSB, saveSSBSuccess} from 'actions/safelySurrenderedBabyActions'
import {
  getFormSafelySurrenderedBaby,
} from 'selectors/screening/safelySurrenderedBabySelectors'

export function* saveSSB({payload: {personId}}) {
  const ssb = yield select(getFormSafelySurrenderedBaby, personId)
  if (!ssb) { return }
  // API call should happen here to actually save the SSB info
  yield put(saveSSBSuccess(ssb.toJS()))
}

export function* saveSSBSaga() {
  yield takeEvery(SAVE_SSB, saveSSB)
}
