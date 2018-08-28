import ScreeningCreateRelationshipContainer from 'containers/screenings/ScreeningCreateRelationshipContainer'
import React from 'react'
import {createMockStore} from 'redux-test-utils'
import {fromJS} from 'immutable'
import * as relationshipsActions from 'actions/relationshipsActions'
import {shallow} from 'enzyme'

describe('ScreeningCreateRelationshipContainer', () => {
  const state = fromJS({
    candidatesForm: {
      1: [{
        person: {
          age: '20 yrs',
          dateOfBirth: '01/15/1986',
          id: '1',
          gender: 'Male',
          legacyId: '3',
          name: 'Ricky Robinson',
        },
        candidate: {
          age: '30 yrs',
          dateOfBirth: '11/11/1958',
          id: '4157',
          gender: 'Male',
          name: 'New York C Pechan, Sr',
        },
      }, {
        person: {
          age: '20 yrs',
          dateOfBirth: '01/15/1986',
          id: '1',
          gender: 'Male',
          legacyId: '3',
          name: 'Ricky Robinson',
        },
        candidate: {
          age: '40 yrs',
          dateOfBirth: '11/11/1968',
          id: '4158',
          gender: 'Male',
          name: 'Walter A White, Sr',
        },
      }],
      2: [],
    },
  })
  const store = createMockStore(state)
  let component
  beforeEach(() => {
    const context = {store}
    component = shallow(<ScreeningCreateRelationshipContainer personId='1'/>, {context}, {disableLifecycleMethods: true})
  })

  it('renders candidates', () => {
    expect(component.find('ScreeningCreateRelationship').props()).toEqual({
      candidates: [{
        person: {
          age: '20 yrs',
          dateOfBirth: '01/15/1986',
          id: '1',
          gender: 'Male',
          legacyId: '3',
          name: 'Ricky Robinson',
        },
        candidate: {
          age: '30 yrs',
          dateOfBirth: '11/11/1958',
          id: '4157',
          gender: 'Male',
          name: 'New York C Pechan, Sr',
        },
      }, {
        person: {
          age: '20 yrs',
          dateOfBirth: '01/15/1986',
          id: '1',
          gender: 'Male',
          legacyId: '3',
          name: 'Ricky Robinson',
        },
        candidate: {
          age: '40 yrs',
          dateOfBirth: '11/11/1968',
          id: '4158',
          gender: 'Male',
          name: 'Walter A White, Sr',
        },
      }],
      onChange: jasmine.any(Function),
      onCancel: jasmine.any(Function),
      personId: '1',
    })
  })

  describe('onChange', () => {
    it('calls setFieldCandidate with person id, candidate id, fieldSet, and value', () => {
      const setFieldCandidateSpy = spyOn(relationshipsActions, 'setFieldCandidate')

      component
        .find('ScreeningCreateRelationship')
        .props()
        .onChange('1', '805', 'relationshipType', '190')
      expect(setFieldCandidateSpy).toHaveBeenCalledWith('1', '805', 'relationshipType', '190')
    })
  })

  describe('onCancel', () => {
    it('calls resetFieldCandidate with person id', () => {
      const resetFieldCandidateSpy = spyOn(relationshipsActions, 'resetFieldCandidate')

      component.find('ScreeningCreateRelationship').props().onCancel('805')
      expect(resetFieldCandidateSpy).toHaveBeenCalledWith('805')
    })
  })
})
