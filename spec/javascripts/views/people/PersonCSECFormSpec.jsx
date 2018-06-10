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

  it('renders ErrorMessage for csec types', () => {
    const component = renderPersonCSECForm({errors: {csec_types: ['csec types error']}})
    const errors = component.find('ErrorMessages')
    expect(errors.exists()).toEqual(true)
    expect(errors.props().errors).toEqual(['csec types error'])
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

  describe('onBlur', () => {
    let onBlur
    beforeEach(() => {
      onBlur = jasmine.createSpy('onBlur')
    })

    it('calls on blur when csec start date field is blurred', () => {
      renderPersonCSECForm({onBlur})
        .find('DateField[label="CSEC Start Date"]')
        .simulate('blur')
      expect(onBlur).toHaveBeenCalledWith('csec_started_at')
    })

    it('calls on blur when csec end date field is blurred', () => {
      renderPersonCSECForm({onBlur})
        .find('DateField[label="CSEC End Date"]')
        .simulate('blur')
      expect(onBlur).toHaveBeenCalledWith('csec_ended_at')
    })

    it('calls on blur when csec types field is blurred', () => {
      renderPersonCSECForm({onBlur})
        .find('Select[multi]')
        .simulate('blur')
      expect(onBlur).toHaveBeenCalledWith('csec_types')
    })
  })
})
