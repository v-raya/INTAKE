import 'babel-polyfill'
import {takeEvery, put, call, select} from 'redux-saga/effects'
import {fromJS} from 'immutable'
import {post} from 'utils/http'
import {
  submitScreeningSaga,
  submitScreening,
} from 'sagas/submitScreeningSaga'
import {getScreeningSelector} from 'selectors/screeningSelectors'
import {SUBMIT_SCREENING} from 'actions/actionTypes'
import * as actions from 'actions/screeningActions'
import {getContactPayloadSelector} from 'selectors/screening/contactSelectors'
import {getFormattedReferralsSelector} from 'selectors/screening/historyOfInvolvementSelectors'

describe('submitScreeningSaga', () => {
  it('submits screening on SUBMIT_SCREENING', () => {
    const gen = submitScreeningSaga()
    expect(gen.next().value).toEqual(takeEvery(SUBMIT_SCREENING, submitScreening))
  })
})

describe('submitScreening', () => {
  const id = 333
  const action = actions.submitScreening(id)
  it('submits and puts submit screening success', () => {
    const screening = fromJS({id: 333, screening_decision: 'promote_to_referral'})
    const gen = submitScreening(action)
    expect(gen.next().value).toEqual(
      select(getScreeningSelector)
    )
    expect(gen.next(screening).value).toEqual(call(post, `/api/v1/screenings/${id}/submit`))
    const response = {id: 333}
    expect(gen.next(response).value).toEqual(
      put(actions.submitScreeningSuccess(response))
    )
    expect(gen.next().value).toEqual(select(getScreeningSelector))
    const currentScreening = fromJS({referral_id: 444})
    expect(gen.next(currentScreening).value).toEqual(
      call(console.log, 'Successfully created referral 444')
    )
  })

  it('submits and puts submit screening contact success', () => {
    const screening = fromJS({id: 333, screening_decision: 'information_to_child_welfare_services', screening_contact_reference: '1'})
    const referrals = fromJS([{referralId: '1', referralLegacyId: 'sdsd'}])
    const contactPayload = fromJS({id: 333})
    const gen = submitScreening(action)
    expect(gen.next().value).toEqual(
      select(getScreeningSelector)
    )
    expect(gen.next(screening).value).toEqual(
      select(getFormattedReferralsSelector)
    )
    expect(gen.next(referrals).value).toEqual(
      select(getContactPayloadSelector)
    )
    expect(gen.next(contactPayload).value).toEqual(call(post, '/api/v1/screenings/sdsd/contact', contactPayload))
    const response = fromJS({id: 333})
    expect(gen.next(response).value).toEqual(
      put(actions.submitScreeningContactSuccess(response))
    )
  })

  it('puts errors when errors are thrown', () => {
    const gen = submitScreening(action)
    expect(gen.next().value).toEqual(
      select(getScreeningSelector)
    )
    const screening = fromJS({id: 333, screening_decision: 'promote_to_referral'})
    expect(gen.next(screening).value).toEqual(call(post, '/api/v1/screenings/333/submit'))
    const error = {
      responseJSON: 'some error json',
      responseText: 'some error text',
    }
    expect(gen.throw(error).value).toEqual(
      put(actions.submitScreeningFailure(error))
    )
    expect(gen.next().value).toEqual(
      call(console.log, error)
    )
  })

  it('puts errors when errors are thrown', () => {
    const gen = submitScreening(action)
    expect(gen.next().value).toEqual(
      select(getScreeningSelector)
    )
    const screening = fromJS({id: 333, screening_decision: 'information_to_child_welfare_services', screening_contact_reference: '1'})
    const referrals = fromJS([{referralId: '1', referralLegacyId: 'sdsd'}])
    const contactPayload = fromJS({id: 333})
    expect(gen.next(screening).value).toEqual(
      select(getFormattedReferralsSelector)
    )
    expect(gen.next(referrals).value).toEqual(
      select(getContactPayloadSelector)
    )
    expect(gen.next(contactPayload).value).toEqual(call(post, '/api/v1/screenings/sdsd/contact', contactPayload))
    const error = {
      responseJSON: 'some error json',
      responseText: 'some error text',
    }
    expect(gen.throw(error).value).toEqual(
      put(actions.submitScreeningContactFailure(error))
    )
    expect(gen.next().value).toEqual(
      call(console.log, error)
    )
  })
})
