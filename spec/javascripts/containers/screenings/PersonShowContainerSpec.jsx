import PersonShowContainer from 'containers/screenings/PersonShowContainer'
import React from 'react'
import {createMockStore} from 'redux-test-utils'
import {fromJS} from 'immutable'
import {shallow} from 'enzyme'

describe('PersonShowContainer', () => {
  const state = fromJS({
    participants: [{id: '1', ssn: '123456789', approximate_age: '9', approximate_age_units: 'dog years',
      csec: [{id: '137', csec_code_id: '6867', start_date: '2018-08-20', end_date: '2017-09-11'}],
      date_of_birth: '2014-01-15', languages: ['Javascript', 'Ruby'], gender: 'female',
      roles: ['super-hero', 'anti-hero'], first_name: 'John', middle_name: 'Q', last_name: 'Public',
      legacy_descriptor: {legacy_ui_id: '1-4', legacy_table_description: 'Client'},
      races: [{race: 'White', race_detail: 'Romanian'}, {race: 'Asian', race_detail: 'Chinese'}],
      ethnicity: {hispanic_latino_origin: 'Yes', ethnicity_detail: ['Mexican']},
    }],
    systemCodes: {
      csecTypes: [
        {code: '6867', value: 'At Risk'},
        {code: '2', value: 'Victim Before Foster Care'},
      ],
    },
  })
  const store = createMockStore(state)
  let component
  beforeEach(() => {
    const context = {store}
    component = shallow(<PersonShowContainer personId='1'/>, {context}, {disableLifecycleMethods: true})
  })
  it('renders PersonInformationShow', () => {
    expect(component.find('PersonInformationShow').props()).toEqual({
      alertErrorMessage: undefined,
      approximateAge: undefined,
      CSECTypes: {
        value: ['At Risk'],
        errors: [],
      },
      csecStartedAt: {
        value: '08/20/2018',
        errors: [],
      },
      csecEndedAt: '09/11/2017',
      dateOfBirth: {
        value: '01/15/2014',
        errors: [],
      },
      name: {
        value: 'John Q Public',
        errors: [],
        required: false,
      },
      ethnicity: 'Mexican - Yes',
      gender: {
        value: 'Female',
        errors: [],
      },
      languages: 'Javascript (Primary), Ruby',
      legacySource: 'Client ID 1-4 in CWS-CMS',
      personId: '1',
      races: 'White - Romanian (primary), Asian - Chinese',
      roles: {
        value: ['super-hero', 'anti-hero'],
        errors: [],
      },
      ssn: {value: '123-45-6789', errors: []},
      showCSEC: undefined,
    })
  })
})
