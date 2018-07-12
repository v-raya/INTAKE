import React from 'react'
import {shallow} from 'enzyme'
import TextAreaCount from 'common/TextAreaCount'

describe('TextAreaCount', () => {
  let component
  let textField
  let onChange
  const props = {
    id: 'some_id',
    maxLength: '250',
    value: 'some value',
  }
  beforeEach(() => {
    onChange = jasmine.createSpy('onChange')
  })
  describe('basic functionality', () => {
    beforeEach(() => {
      component = shallow(<TextAreaCount {...props} onChange={onChange} />, {disableLifecycleMethods: true})
      textField = component.find('textarea')
    })
    it('passes props to the TextAreaCount', () => {
      expect(textField.props().id).toEqual('some_id')
      expect(textField.props().maxLength).toEqual('250')
      expect(textField.props().value).toEqual('some value')
    })
    it('renders the textarea counter field value', () => {
      expect(component.find('span').text()).toEqual('10 / 250')
    })
    it('textarea counter value should be empty when there is no value present', () => {
      const props = {
        id: 'some_id',
        maxLength: '250',
        value: '',
      }
      const component = shallow(<TextAreaCount {...props} />, {disableLifecycleMethods: true})
      expect(component.find('span').text()).toEqual('')
    })
  })
})
