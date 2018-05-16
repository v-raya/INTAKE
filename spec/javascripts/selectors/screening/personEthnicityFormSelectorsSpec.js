import {fromJS} from 'immutable'
import {
  getAreEthnicityFieldsDisabledForPersonSelector,
  getPersonHispanicLatinoOriginValueSelector,
  getPersonEthnicityDetailValueSelector,
} from 'selectors/screening/personEthnicityFormSelectors'
import * as matchers from 'jasmine-immutable-matchers'

describe('personEthnicityFormSelectors', () => {
  beforeEach(() => jasmine.addMatchers(matchers))
  describe('getAreEthnicityFieldsDisabledForPersonSelector', () => {
    it('returns true if hispanic_latino_origin is set for the person passed', () => {
      const peopleForm = {
        one: {ethnicity: {hispanic_latino_origin: {value: null}}},
        two: {ethnicity: {hispanic_latino_origin: {value: 'Yes'}}},
      }
      const state = fromJS({peopleForm})
      expect(getAreEthnicityFieldsDisabledForPersonSelector(state, 'two')).toEqual(true)
    })

    it('returns false if hispanic_latino_origin is set for the person passed', () => {
      const peopleForm = {
        one: {ethnicity: {hispanic_latino_origin: {value: null}}},
        two: {ethnicity: {hispanic_latino_origin: {value: 'Yes'}}},
      }
      const state = fromJS({peopleForm})
      expect(getAreEthnicityFieldsDisabledForPersonSelector(state, 'one')).toEqual(false)
    })
  })

  describe('getPersonHispanicLatinoOriginValueSelector', () => {
    it('returns the value of hispanic_latino_origin for the person passed', () => {
      const peopleForm = {
        one: {ethnicity: {hispanic_latino_origin: {value: null}}},
        two: {ethnicity: {hispanic_latino_origin: {value: 'Yes'}}},
      }
      const state = fromJS({peopleForm})
      expect(getPersonHispanicLatinoOriginValueSelector(state, 'two')).toEqual('Yes')
    })
  })

  describe('getPersonEthnicityDetailValueSelector', () => {
    it('returns the first value of ethnicity_detail for the person passed', () => {
      const peopleForm = {
        one: {ethnicity: {ethnicity_detail: {value: ['Hispanic']}}},
        two: {ethnicity: {ethnicity_detail: {value: ['Mexican']}}},
      }
      const state = fromJS({peopleForm})
      expect(getPersonEthnicityDetailValueSelector(state, 'one')).toEqual('Hispanic')
    })
  })
})
