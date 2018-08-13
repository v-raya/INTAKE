import {fromJS, List} from 'immutable'
import {
  selectAddresses,
  selectReadWriteAddresses,
  selectReadOnlyAddresses,
  selectAddressTypeOptions,
} from 'selectors/screening/personAddressesFormSelectors'
import * as matchers from 'jasmine-immutable-matchers'

describe('personAddressesFormSelectors', () => {
  beforeEach(() => jasmine.addMatchers(matchers))

  describe('selectAddresses', () => {
    const person = fromJS({
      addresses: [{
        touched: {},
        id: 2212,
        street: '1234 Nowhere Lane',
        city: 'Somewhereville',
        state: 'CA',
        zip: '55555',
        type: 'Home',
        legacy_descriptor: {legacy_id: 'xyz122'},
      },
      {
        touched: {},
        id: 3,
        street: '223 Van der Burgh Ave',
        city: 'Calistoga',
        state: 'CA',
        zip: '839893',
        type: 'Home',
        legacy_descriptor: null,
      }],
    })

    it('returns all addresses for the given person', () => {
      expect(selectAddresses(person)).toEqualImmutable(fromJS(
        [{
          id: 2212,
          street: '1234 Nowhere Lane',
          city: 'Somewhereville',
          state: 'CA',
          zip: '55555',
          type: 'Home',
          legacy_descriptor: {legacy_id: 'xyz122'},
        }, {
          id: 3,
          street: '223 Van der Burgh Ave',
          city: 'Calistoga',
          state: 'CA',
          zip: '839893',
          type: 'Home',
          legacy_descriptor: null,
        }]
      ))
    })
  })

  describe('selectAddressTypeOptions', () => {
    const state = fromJS({
      systemCodes: {
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
      },
    })
    it('returns formatted options for address types', () => {
      expect(selectAddressTypeOptions(state)).toEqualImmutable(fromJS([
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
  describe('selectReadWriteAddresses', () => {
    it('returns the editable addresses for the person with the passed id', () => {
      const peopleForm = {
        one: {addresses: [{
          touched: {},
          id: 2212,
          street: '1234 Nowhere Lane',
          city: 'Somewhereville',
          state: 'CA',
          zip: '55555',
          type: 'Home',
          legacy_descriptor: {legacy_id: 'xyz122'},
        },
        {
          touched: {},
          id: 3,
          street: '223 Van der Burgh Ave',
          city: 'Calistoga',
          state: 'CA',
          zip: '839893',
          type: 'Home',
          legacy_descriptor: null,
        },
        ]},
        two: {addresses: [{
          touched: {},
          id: null,
          street: '9674 Somewhere Street',
          city: 'Nowhereville',
          state: 'CA',
          zip: '55555',
          type: 'Cell',
          legacy_descriptor: null,
        }]},
      }
      const state = fromJS({peopleForm})
      expect(selectReadWriteAddresses(state, 'one')).toEqualImmutable(fromJS(
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
  describe('selectReadOnlyAddresses', () => {
    it('returns the non-editable addresses for the person with the passed id', () => {
      const peopleForm = {
        one: {addresses: [{
          touched: {},
          id: 2212,
          street: '1234 Nowhere Lane',
          city: 'Somewhereville',
          state: 'CA',
          zip: '55555',
          type: 'Home',
          legacy_descriptor: {legacy_id: 'xyz122'},
        },
        {
          touched: {},
          id: 3,
          street: '223 Van der Burgh Ave',
          city: 'Calistoga',
          state: 'CA',
          zip: '839893',
          type: 'Home',
          legacy_descriptor: null,
        },
        ]},
        two: {addresses: [{
          touched: {},
          id: null,
          street: '9674 Somewhere Street',
          city: 'Nowhereville',
          state: 'CA',
          zip: '55555',
          type: 'Cell',
          legacy_descriptor: null,
        }]},
      }
      const state = fromJS({peopleForm})
      expect(selectReadOnlyAddresses(state, 'one')).toEqualImmutable(fromJS(
        [{
          id: 2212,
          street: '1234 Nowhere Lane',
          city: 'Somewhereville',
          state: 'CA',
          zip: '55555',
          type: 'Home',
          legacy_descriptor: {legacy_id: 'xyz122'},
        }]
      ))
    })
  })
})
