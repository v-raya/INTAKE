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
        {value: 'Common'},
        {value: 'Day Care'},
        {value: 'Residence'},
        {value: 'Homeless'},
        {value: 'Other Mailing'},
        {value: 'Penal Institution'},
        {value: 'Permanent Mailing Address'},
        {value: 'Residence 2'},
        {value: 'Business'},
      ],
    })
    it('returns formatted options for address types', () => {
      expect(getAddressTypeOptionsSelector(state)).toEqualImmutable(fromJS([
        {label: 'Common'},
        {label: 'Day Care'},
        {label: 'Residence'},
        {label: 'Homeless'},
        {label: 'Other Mailing'},
        {label: 'Penal Institution'},
        {label: 'Permanent Mailing Address'},
        {label: 'Residence 2'},
        {label: 'Business'},
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
