import {
  fromFerbAddress,
  toFerbAddress,
  setTouchable,
  isReadWrite,
  isReadOnly,
  expandState,
  setErrors,
  setVisibleErrors,
} from 'data/address'
import {fromJS, Map} from 'immutable'
import * as matchers from 'jasmine-immutable-matchers'

describe('Address', () => {
  beforeEach(() => jasmine.addMatchers(matchers))

  describe('fromFerbAddress', () => {
    it('returns an Immutable Map', () => {
      expect(Map.isMap(fromFerbAddress(Map()))).toEqual(true)
    })

    it('filters out unknown fields', () => {
      const address = fromFerbAddress(fromJS({foo: 'bar'}))
      expect(address.get('foo')).toBeUndefined()
    })

    it('handles an address persisted to legacy', () => {
      const address = fromFerbAddress(fromJS({
        id: '1',
        street_address: '2870 Gateway Oaks Dr',
        city: 'Sacramento',
        state: 'CA',
        zip: '95833',
        type: 'Work',
        legacy_descriptor: {legacy_id: 'ABC123'},
      }))

      expect(address).toEqualImmutable(fromJS({
        id: '1',
        street: '2870 Gateway Oaks Dr',
        city: 'Sacramento',
        state: 'CA',
        zip: '95833',
        type: 'Work',
        legacy_descriptor: {legacy_id: 'ABC123'},
      }))
    })

    it('handles an editable address from Postgres', () => {
      const address = fromFerbAddress(fromJS({
        id: '1',
        street_address: '2870 Gateway Oaks Dr',
        city: 'Sacramento',
        state: 'CA',
        zip: '95833',
        type: 'Work',
      }))

      expect(address).toEqualImmutable(fromJS({
        id: '1',
        street: '2870 Gateway Oaks Dr',
        city: 'Sacramento',
        state: 'CA',
        zip: '95833',
        type: 'Work',
        legacy_descriptor: null,
      }))
    })
  })

  describe('toFerbAddress', () => {
    it('returns an Immutable Map', () => {
      expect(Map.isMap(toFerbAddress(Map()))).toEqual(true)
    })

    it('handles an address persisted to legacy', () => {
      const address = toFerbAddress(fromJS({
        id: '1',
        street: '2870 Gateway Oaks Dr',
        city: 'Sacramento',
        state: 'CA',
        zip: '95833',
        type: 'Work',
        legacy_descriptor: {legacy_id: 'ABC123'},
      }))

      expect(address).toEqualImmutable(fromJS({
        id: '1',
        street_address: '2870 Gateway Oaks Dr',
        city: 'Sacramento',
        state: 'CA',
        zip: '95833',
        type: 'Work',
        legacy_descriptor: {legacy_id: 'ABC123'},
      }))
    })

    it('handles an editable address from Postgres', () => {
      const address = toFerbAddress(fromJS({
        id: '1',
        street: '2870 Gateway Oaks Dr',
        city: 'Sacramento',
        state: 'CA',
        zip: '95833',
        type: 'Work',
        legacy_descriptor: null,
      }))

      expect(address).toEqualImmutable(fromJS({
        id: '1',
        street_address: '2870 Gateway Oaks Dr',
        city: 'Sacramento',
        state: 'CA',
        zip: '95833',
        type: 'Work',
      }))
    })

    it('handles a new address, including a new id', () => {
      const address = toFerbAddress(fromJS({
        id: null,
        street: '2870 Gateway Oaks Dr',
        city: 'Sacramento',
        state: 'CA',
        zip: '95833',
        type: 'Work',
        legacy_descriptor: null,
      }))

      expect(address).toEqualImmutable(fromJS({
        id: null,
        street_address: '2870 Gateway Oaks Dr',
        city: 'Sacramento',
        state: 'CA',
        zip: '95833',
        type: 'Work',
      }))
    })

    it('deletes touched fields information', () => {
      const address = toFerbAddress(fromJS({
        touched: {zip: true, street: false},
        id: null,
        street: '2870 Gateway Oaks Dr',
        city: 'Sacramento',
        state: 'CA',
        zip: '95833',
        type: 'Work',
        legacy_descriptor: null,
      }))

      expect(address).toEqualImmutable(fromJS({
        id: null,
        street_address: '2870 Gateway Oaks Dr',
        city: 'Sacramento',
        state: 'CA',
        zip: '95833',
        type: 'Work',
      }))
    })
  })

  describe('setTouchable', () => {
    it('sets an empty touched object on the address', () => {
      const address = fromFerbAddress(Map())
      const touchable = setTouchable(address)
      expect(touchable.has('touched')).toEqual(true)
      expect(touchable.get('touched')).toEqualImmutable(Map())
    })
  })

  describe('isReadWrite', () => {
    it('is false for an address with a legacy_id', () => {
      const address = fromJS({legacy_descriptor: {legacy_id: '123'}})
      expect(isReadWrite(address)).toEqual(false)
    })
    it('is true for an address with no legacy_id', () => {
      const address = fromJS({legacy_descriptor: null})
      expect(isReadWrite(address)).toEqual(true)
    })
  })
  describe('isReadOnly', () => {
    it('is true for an address with a legacy_id', () => {
      const address = fromJS({legacy_descriptor: {legacy_id: '123'}})
      expect(isReadOnly(address)).toEqual(true)
    })
    it('is false for an address with no legacy_id', () => {
      const address = fromJS({legacy_descriptor: null})
      expect(isReadOnly(address)).toEqual(false)
    })
  })

  describe('expandState', () => {
    it('translates a two letter abbreviation to a full state name', () => {
      const ca = Map({state: 'CA'})
      expect(expandState(ca)).toEqualImmutable(Map({state: 'California'}))

      const nh = Map({state: 'NH'})
      expect(expandState(nh)).toEqualImmutable(Map({state: 'New Hampshire'}))
    })
  })

  describe('setErrors', () => {
    it('sets zipError', () => {
      const address = fromJS({
        id: '1',
        street: '2870 Gateway Oaks Dr',
        city: 'Sacramento',
        state: 'CA',
        zip: '9',
        type: 'Work',
        legacy_descriptor: null,
      })

      expect(setErrors(address)).toEqualImmutable(fromJS({
        id: '1',
        street: '2870 Gateway Oaks Dr',
        city: 'Sacramento',
        state: 'CA',
        zip: '9',
        type: 'Work',
        legacy_descriptor: null,
        zipError: ['zip code should be 5 digits'],
      }))
    })

    it('sets no errors for legacy addresses', () => {
      const address = fromJS({
        id: '1',
        street: '2870 Gateway Oaks Dr',
        city: 'Sacramento',
        state: 'CA',
        zip: '9',
        type: 'Work',
        legacy_descriptor: {legacy_id: 'ABC123'},
      })

      expect(setErrors(address)).toEqualImmutable(fromJS({
        id: '1',
        street: '2870 Gateway Oaks Dr',
        city: 'Sacramento',
        state: 'CA',
        zip: '9',
        type: 'Work',
        legacy_descriptor: {legacy_id: 'ABC123'},
        zipError: null,
      }))
    })
  })
  describe('setVisibleErrors', () => {
    it('sets zipError', () => {
      const address = fromJS({
        touched: {zip: true},
        id: '1',
        street: '2870 Gateway Oaks Dr',
        city: 'Sacramento',
        state: 'CA',
        zip: '9',
        type: 'Work',
        legacy_descriptor: null,
      })

      expect(setVisibleErrors(address)).toEqualImmutable(fromJS({
        touched: {zip: true},
        id: '1',
        street: '2870 Gateway Oaks Dr',
        city: 'Sacramento',
        state: 'CA',
        zip: '9',
        type: 'Work',
        legacy_descriptor: null,
        zipError: ['zip code should be 5 digits'],
      }))
    })

    it('sets no errors if zip is untouched', () => {
      const address = fromJS({
        touched: {zip: false},
        id: '1',
        street: '2870 Gateway Oaks Dr',
        city: 'Sacramento',
        state: 'CA',
        zip: '9',
        type: 'Work',
        legacy_descriptor: {legacy_id: 'ABC123'},
      })

      expect(setVisibleErrors(address)).toEqualImmutable(fromJS({
        touched: {zip: false},
        id: '1',
        street: '2870 Gateway Oaks Dr',
        city: 'Sacramento',
        state: 'CA',
        zip: '9',
        type: 'Work',
        legacy_descriptor: {legacy_id: 'ABC123'},
        zipError: [],
      }))
    })
  })
})
