import {takeEvery, put, call, select} from 'redux-saga/effects'
import {post} from 'utils/http'
import {
  submitScreeningSuccess,
  submitScreeningFailure,
} from 'actions/screeningActions'
import {getScreeningSelector} from 'selectors/screeningSelectors'
import {getContactPayloadSelector} from 'selectors/screening/contactSelectors'
import {getFormattedReferralsSelector} from 'selectors/screening/historyOfInvolvementSelectors'
import {SUBMIT_SCREENING} from 'actions/actionTypes'

function* submitContact(screening) {
  const referralId = screening.get('screening_contact_reference')
  //const cases = yield select(getFormattedCasesSelector)
  const referrals = yield select(getFormattedReferralsSelector)
  //const filteredCases = cases.filter((caseItem) => caseItem.get('caseId') === caseReferralId)
  const filteredReferrals = referrals.filter((referralItem) => referralItem.get('referralId') === referralId)
  //const caseReferralLegacyId = filteredCases.first() === undefined ? filteredReferrals.first().get('referralLegacyId') : filteredCases.first().get('caseLegacyId')
  const referralLegacyId = filteredReferrals.first().get('referralLegacyId')
  const contactPayload = yield select(getContactPayloadSelector)
  yield call(post, `/api/v1/screenings/${referralLegacyId}/contact`, contactPayload)
}

function* submitReferral(id) {
  const response = yield call(post, `/api/v1/screenings/${id}/submit`)
  yield put(submitScreeningSuccess(response))
  const screening = yield select(getScreeningSelector)
  yield call(console.log, `Successfully created referral ${screening.get('referral_id')}`)
}

export function* submitScreening({payload: {id}}) {
  try {
    const screening = yield select(getScreeningSelector)
    if (screening.get('screening_decision') === 'information_to_child_welfare_services') {
      yield* submitContact(screening)
    } else {
      yield* submitReferral(id)
    }
  } catch (error) {
    yield put(submitScreeningFailure(error))
    yield call(console.log, error)
  }
}
export function* submitScreeningSaga() {
  yield takeEvery(SUBMIT_SCREENING, submitScreening)
}
