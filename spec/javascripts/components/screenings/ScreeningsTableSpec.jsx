import React from 'react'
import {shallow} from 'enzyme'
import ScreeningsTable from 'screenings/ScreeningsTable'
import {decisionType, screeningNameLink, reportDateAndTime} from 'screenings/ScreeningsTable'

describe('ScreeningsTable', () => {
  const view = shallow(<ScreeningsTable />, {disableLifecycleMethods: true})

  it('renders BootstrapTable for screenings', () => {
    expect(view.find('BootstrapTable').length).toBe(1)
  })

  it('has a TableHeaderColumn', () => {
    expect(view.find('TableHeaderColumn').length).toBe(5)
  })

  it('returns value for promote_to_referral decision type when value present', () => {
    const row = {screening_decision: 'promote_to_referral', screening_decision_detail: 'immediate'}

    expect(decisionType({}, row)).toEqual('Immediate')

    row.screening_decision_detail = '3_days'
    expect(decisionType({}, row)).toEqual('3 days')

    row.screening_decision_detail = '5_days'
    expect(decisionType({}, row)).toEqual('5 days')

    row.screening_decision_detail = '10_days'
    expect(decisionType({}, row)).toEqual('10 days')
  })

  it('returns value for screen_out decision type when value present', () => {
    const row = {screening_decision: 'screen_out', screening_decision_detail: 'evaluate_out'}

    expect(decisionType({}, row)).toEqual('Evaluate out')

    row.screening_decision_detail = 'information_request'
    expect(decisionType({}, row)).toEqual('Information request')

    row.screening_decision_detail = 'consultation'
    expect(decisionType({}, row)).toEqual('Consultation')

    row.screening_decision_detail = 'abandoned_call'
    expect(decisionType({}, row)).toEqual('Abandoned call')

    row.screening_decision_detail = 'other'
    expect(decisionType({}, row)).toEqual('Other')
  })

  it('returns undefined for decision type when value is blank', () => {
    const row = {screening_decision: null, screening_decision_detail: 'evaluate_out'}

    expect(decisionType({}, row)).toEqual(undefined)

    row.screening_decision = undefined
    expect(decisionType({}, row)).toEqual(undefined)

    row.screening_decision = ''
    expect(decisionType({}, row)).toEqual(undefined)

    row.screening_decision = 'bad_data'
    expect(decisionType({}, row)).toEqual(undefined)
  })

  it('returns differential_response for decision type when value is present', () => {
    const row = {screening_decision: 'differential_response', screening_decision_detail: null}
    expect(decisionType({}, row)).toEqual('Differential response')
  })

  it('returns information_to_child_welfare_services for decision type when value is present', () => {
    const row = {screening_decision: 'information_to_child_welfare_services', screening_decision_detail: null}
    expect(decisionType({}, row)).toEqual('Information to child welfare services')
  })

  it('returns an object with screening name and id for a given screening', () => {
    const row = {id: 1, referralId: 1, name: 'Hello World!'}
    expect(screeningNameLink({}, row).props).toEqual({
      to: '/screenings/1',
      children: 'Hello World!',
      onlyActiveOnIndex: false,
      style: Object({ }),
    })
  })

  it('returns an object with screening name as screening id', () => {
    const row = {id: 1, referralId: 1, name: null}
    expect(screeningNameLink({}, row).props).toEqual({
      to: '/screenings/1',
      children: 1,
      onlyActiveOnIndex: false,
      style: Object({ }),
    })
  })

  it('return undefined for invalid startedAt value', () => {
    expect(reportDateAndTime('')).toEqual(undefined)
    expect(reportDateAndTime(null)).toEqual(undefined)
  })
})
