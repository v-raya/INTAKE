import {fromJS, List} from 'immutable'
import {
  getPersonEditableAddressesSelector,
  getAddressTypeOptionsSelector,
} from 'selectors/screening/personAddressesFormSelectors'
import * as matchers from 'jasmine-immutable-matchers'

describe('personAddressesFormSelectors', () => {
  beforeEach(() => jasmine.addMatchers(matchers))

  describe('getAddressTypeOptionsSelector', () => {
    const state = fromJS({
      addressTypes: [
        {code: '6273', value: 'Common'},
        {code: '28', value: 'Day Care'},
        {code: '32', value: 'Residence'},
        {code: '29', value: 'Homeless'},
        {code: '6272', value: 'Other Mailing'},
        {code: '30', value: 'Penal Institution'},
        {code: '31', value: 'Permanent Mailing Address'},
        {code: '6271', value: 'Residence 2'},
        {code: '27', value: 'Business'},
      ],
    })
    it('returns formatted options for address types', () => {
      expect(getAddressTypeOptionsSelector(state)).toEqualImmutable(fromJS([
        {value: '6273', label: 'Common'},
        {value: '28', label: 'Day Care'},
        {value: '32', label: 'Residence'},
        {value: '29', label: 'Homeless'},
        {value: '6272', label: 'Other Mailing'},
        {value: '30', label: 'Penal Institution'},
        {value: '31', label: 'Permanent Mailing Address'},
        {value: '6271', label: 'Residence 2'},
        {value: '27', label: 'Business'},
      ]))
    })
  })
  describe('getPersonEditableAddressesSelector', () => {
    it('returns the editable addresses for the person with the passed id', () => {
      const peopleForm = {
        one: {addresses: [{
          id: 2212,
          street: {value: '1234 Nowhere Lane'},
          city: {value: 'Somewhereville'},
          state: {value: 'CA'},
          zip: {value: '55555'},
          type: {value: 'Home'},
          legacy_descriptor: {value: {legacy_id: 'xyz122'}},
        },
        {
          id: 3,
          street: {value: '223 Van der Burgh Ave'},
          city: {value: 'Calistoga'},
          state: {value: 'CA'},
          zip: {value: '839893'},
          type: {value: 'Home'},
        },
        ]},
        two: {addresses: [{
          street: {value: '9674 Somewhere Street'},
          city: {value: 'Nowhereville'},
          state: {value: 'CA'},
          zip: {value: '55555'},
          type: {value: 'Cell'},
        }]},
      }
      const state = fromJS({peopleForm})
      expect(getPersonEditableAddressesSelector(state, 'one')).toEqualImmutable(fromJS(
        [{
          id: 3,
          street: '223 Van der Burgh Ave',
          city: 'Calistoga',
          state: 'CA',
          zip: '839893',
          type: 'Home',
          zipError: List(),
        }]
      ))
    })
  })
})
