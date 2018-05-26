import {takeEvery, select, put} from 'redux-saga/effects'
import {SAVE_SSB, saveSSBSuccess} from 'actions/safelySurrenderedBabyActions'
import {
  getFormSafelySurrenderedBaby,
} from 'selectors/screening/safelySurrenderedBabySelectors'
import {getReportType} from 'selectors/screening/screeningInformationShowSelectors'

export function* saveSSB({payload: {personId}}) {
  const ssb = yield select(getFormSafelySurrenderedBaby, personId)
  if (!ssb) { return }

  const reportType = yield select(getReportType)
  if (reportType !== 'ssb') { return }
  // API call should happen here to actually save the SSB info
  yield put(saveSSBSuccess(ssb.toJS()))
}

export function* saveSSBSaga() {
  yield takeEvery(SAVE_SSB, saveSSB)
}
