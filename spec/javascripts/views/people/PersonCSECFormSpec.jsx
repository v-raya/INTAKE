import PersonCSECForm from 'views/people/PersonCSECForm'
import React from 'react'
import {shallow} from 'enzyme'

describe('PersonCSECForm', () => {
  function renderPersonCSECForm({
    errors = {},
    showCSEC = true,
    ...args
  }) {
    const props = {errors, showCSEC, ...args}
    return shallow(<PersonCSECForm {...props}/>, {disableLifecycleMethods: true})
  }

  it('renders the CSEC Start Date', () => {
    const field = renderPersonCSECForm({csecStartedAt: '2/22/2022'})
      .find('DateField[label="CSEC Start Date"]')
    expect(field.props().value).toEqual('2/22/2022')
  })

  it('renders the csec started at field errors', () => {
    const csecStartedAt = renderPersonCSECForm({
      errors: {csec_started_at: ['Error 2']},
    }).find('DateField[label="CSEC Start Date"]')
    expect(csecStartedAt.props().errors).toEqual(['Error 2'])
  })

  it('renders the CSEC End Date', () => {
    const field = renderPersonCSECForm({csecEndedAt: '2/22/2022'})
      .find('DateField[label="CSEC End Date"]')
    expect(field.props().value).toEqual('2/22/2022')
  })

  it('renders the csec ended at field errors', () => {
    const csecEndedAt = renderPersonCSECForm({
      errors: {csec_ended_at: ['Error 1']},
    }).find('DateField[label="CSEC End Date"]')
    expect(csecEndedAt.props().errors).toEqual(['Error 1'])
  })

  it('renders the CSEC type field and its options', () => {
    const form = renderPersonCSECForm({
      personId: '1', CSECTypes: ['At Risk', 'Victim During Foster Care'],
    })
    const CSECField = form.find('Select[multi]')
    expect(CSECField.props().value).toEqual(['At Risk', 'Victim During Foster Care'])
  })

  describe('onChange', () => {
    let onChange
    beforeEach(() => {
      onChange = jasmine.createSpy('onChange')
    })

    it('is fired when CSEC Start Date changes', () => {
      renderPersonCSECForm({csecStartedAt: '2/22/2022', onChange})
        .find('DateField[label="CSEC Start Date"]').simulate('change', '2/22/2022')
      expect(onChange).toHaveBeenCalledWith('csec_started_at', '2/22/2022')
    })

    it('is fired when CSEC End Date changes', () => {
      renderPersonCSECForm({csecEndedAt: '2/22/2022', onChange})
        .find('DateField[label="CSEC End Date"]').simulate('change', '2/22/2022')
      expect(onChange).toHaveBeenCalledWith('csec_ended_at', '2/22/2022')
    })

    it('is fired when CSEC types change', () => {
      renderPersonCSECForm({CSECTypes: ['At Risk'], onChange}).find('Select')
        .simulate('change', [{value: 'At Risk'}])
      expect(onChange).toHaveBeenCalledWith('csec_types', ['At Risk'])
    })
  })
})
