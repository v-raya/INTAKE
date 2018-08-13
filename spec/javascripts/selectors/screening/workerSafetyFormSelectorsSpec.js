import {fromJS, List} from 'immutable'
import {
  getAlertValuesSelector,
  getInformationValueSelector,
  getScreeningWithEditsSelector,
} from 'selectors/screening/workerSafetyFormSelectors'
import * as matchers from 'jasmine-immutable-matchers'

describe('workerSafetyFormSelectors', () => {
  beforeEach(() => jasmine.addMatchers(matchers))

  describe('getAlertValuesSelector', () => {
    it('returns a value when one is present', () => {
      const workerSafetyForm = {safety_alerts: {value: ['ABC']}}
      const state = fromJS({workerSafetyForm})
      expect(getAlertValuesSelector(state)).toEqual(List(['ABC']))
    })

    it('returns empty list when safety alerts is not present', () => {
      const workerSafetyForm = {}
      const state = fromJS({workerSafetyForm})
      expect(getAlertValuesSelector(state)).toEqual(List([]))
    })
  })

  describe('getInformationValueSelector', () => {
    it('returns a value when one is present', () => {
      const workerSafetyForm = {safety_information: {value: 'ABC'}}
      const state = fromJS({workerSafetyForm})
      expect(getInformationValueSelector(state)).toEqual('ABC')
    })

    it('returns undefined when safety information is not present', () => {
      const workerSafetyForm = {}
      const state = fromJS({workerSafetyForm})
      expect(getInformationValueSelector(state)).toEqual(undefined)
    })
  })

  describe('getScreeningWithEditsSelector', () => {
    it('returns a screening with updated safety fields if the form has a value', () => {
      const screening = {safety_alerts: ['ABC'], safety_information: 'DEF'}
      const workerSafetyForm = {
        safety_alerts: {value: ['123'], touched: true},
        safety_information: {value: '456', touched: true},
      }
      const state = fromJS({screening, workerSafetyForm})
      expect(getScreeningWithEditsSelector(state))
        .toEqualImmutable(fromJS({safety_alerts: List(['123']), safety_information: '456', participants: []}))
    })
    it('takes the participants from the participants list', () => {
      const screening = {
        safety_alerts: ['ABC'],
        safety_information: 'DEF',
        participants: [{id: '456', first_name: 'Luigi'}],
      }
      const workerSafetyForm = {
        safety_alerts: {value: ['123'], touched: true},
        safety_information: {value: '456', touched: true},
      }
      const participants = [{id: '123', first_name: 'Mario', addresses: []}]
      const state = fromJS({screening, workerSafetyForm, participants})
      expect(getScreeningWithEditsSelector(state))
        .toEqualImmutable(fromJS({safety_alerts: List(['123']), safety_information: '456', participants}))
    })
    it('converts addresses to the format Ferb expects', () => {
      const screening = {
        safety_alerts: ['ABC'],
        safety_information: 'DEF',
        participants: [{id: '456', first_name: 'Luigi'}],
      }
      const workerSafetyForm = {
        safety_alerts: {value: ['123'], touched: true},
        safety_information: {value: '456', touched: true},
      }
      const participants = [{
        id: '1',
        first_name: 'Mario',
        addresses: [{
          id: '1',
          street: '1000 Peach Castle',
          city: 'World 1-1',
          state: 'Mushroom Kingdom',
          zip: '00001',
          type: 'Home',
          legacy_descriptor: {legacy_id: 'ABC123'},
        }],
      }]
      const state = fromJS({screening, workerSafetyForm, participants})
      expect(getScreeningWithEditsSelector(state))
        .toEqualImmutable(fromJS({
          safety_alerts: List(['123']),
          safety_information: '456',
          participants: [{
            id: '1',
            first_name: 'Mario',
            addresses: [{
              id: '1',
              street_address: '1000 Peach Castle',
              city: 'World 1-1',
              state: 'Mushroom Kingdom',
              zip: '00001',
              type: 'Home',
              legacy_descriptor: {legacy_id: 'ABC123'},
            }],
          }],
        }))
    })
  })
})
