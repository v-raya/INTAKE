import PersonDemographicsFormContainer from 'containers/screenings/PersonDemographicsFormContainer'
import React from 'react'
import {createMockStore} from 'redux-test-utils'
import {fromJS} from 'immutable'
import * as peopleActions from 'actions/peopleFormActions'
import {shallow} from 'enzyme'

describe('PersonDemographicsFormContainer', () => {
  const state = fromJS({
    peopleForm: {1: {ssn: {value: '123456789'}, approximate_age: {value: ''}, approximate_age_units: {value: ''},
      date_of_birth: {value: '2014-01-15'}, dateOfBirthError: [], languages: {value: ['Javascript', 'Ruby']}, gender: {value: 'female'},
      roles: {value: ['super-hero', 'anti-hero']}, first_name: {value: 'John'}, middle_name: {value: 'Q'}, last_name: {value: 'Public'},
      races: {value: [{race: 'White', race_detail: 'Romanian'}, {race: 'Asian', race_detail: 'Chinese'}]},
      ethnicity: {value: {hispanic_latino_origin: 'Yes'}, ethnicity_detail: {value: ['Mexican']}},
    }}})
  const store = createMockStore(state)
  let component
  beforeEach(() => {
    const context = {store}
    component = shallow(<PersonDemographicsFormContainer personId='1'/>, {context}, {disableLifecycleMethods: true})
  })
  it('renders PersonDemographicsForm', () => {
    expect(component.find('PersonDemographicsForm').props()).toEqual({
      approximateAge: '',
      approximateAgeUnit: '',
      approximateAgeIsDisabled: true,
      dateOfBirth: '2014-01-15',
      dateOfBirthIsRequired: false,
      dateOfBirthError: [],
      gender: 'female',
      genderIsRequired: false,
      genderError: undefined,
      languages: ['Javascript', 'Ruby'],
      onChange: jasmine.any(Function),
      personId: '1',
    })
  })
  describe('onChange', () => {
    it('calls setField with a max of 2 languages', () => {
      const setFieldSpy = spyOn(peopleActions, 'setField')
      component.find('PersonDemographicsForm').props().onChange('languages', [
        {label: 'Omega', value: 'Ω'},
        {label: 'Beta', value: 'ß'},
        {label: 'Alpha', value: '∂'},
        {label: 'Delta', value: '∆'},
      ])
      expect(setFieldSpy).toHaveBeenCalledWith('1', ['languages'], ['Ω', 'ß'])
    })

    it('calls setField with passed value if field is not languages', () => {
      const setFieldSpy = spyOn(peopleActions, 'setField')
      component.find('PersonDemographicsForm').props().onChange('gender', 'male')
      expect(setFieldSpy).toHaveBeenCalledWith('1', ['gender'], 'male')
    })

    it('clears approximate age on populating date of birth', () => {
      const setFieldSpy = spyOn(peopleActions, 'setField')
      component.find('PersonDemographicsForm').props().onChange('date_of_birth', '2/22/2022')
      expect(setFieldSpy).toHaveBeenCalledWith('1', ['date_of_birth'], '2/22/2022')
      expect(setFieldSpy).toHaveBeenCalledWith('1', ['approximate_age'], null)
      expect(setFieldSpy).toHaveBeenCalledWith('1', ['approximate_age_units'], null)
    })
  })
})
