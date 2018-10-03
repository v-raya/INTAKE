import {fromJS, Map, List} from 'immutable'
import {
  getPersonPhoneNumbersSelector,
  getPhoneNumberTypeOptions,
} from 'selectors/screening/personPhoneNumbersFormSelectors'
import * as matchers from 'jasmine-immutable-matchers'

describe('personPhoneNumbersFormSelectors', () => {
  beforeEach(() => jasmine.addMatchers(matchers))
  describe('getPhoneNumberTypeOptions', () => {
    it('returns formatted options for phone types', () => {
      expect(getPhoneNumberTypeOptions()).toEqualImmutable(fromJS([
        {value: 'Cell', label: 'Cell'},
        {value: 'Work', label: 'Work'},
        {value: 'Home', label: 'Home'},
        {value: 'Other', label: 'Other'},
      ]))
    })
  })

  describe('getPersonFormattedPhoneNumbersSelector', () => {
    it('returns the phone numbers for the person with the passed id', () => {
      const peopleForm = {
        one: {phone_numbers: [{
          number: {value: '1234567890'},
          type: {value: 'Home'}},
        ]},
        two: {phone_numbers: [{
          number: {value: '0987654321'},
          type: {value: 'Cell'}},
        ]},
      }
      const state = fromJS({peopleForm})
      expect(getPersonPhoneNumbersSelector(state, 'one')).toEqual(List([Map(
        {number: '1234567890', type: 'Home', errors: []}
      )]))
    })
  })
})
