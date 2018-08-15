import {
  fromFerbAddress,
  toFerbAddress,
  setTouchable,
  isReadWrite,
  isReadOnly,
  formatForDisplay,
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

  describe('formatForDisplay', () => {
    const address = fromJS({
      id: '1',
      street: '2870 Gateway Oaks Dr',
      city: 'Sacramento',
      state: 'CA',
      zip: '95833',
      type: 'Work',
      legacy_descriptor: {legacy_id: 'ABC123'},
    })

    it('copies over basic fields', () => {
      expect(formatForDisplay(address)).toEqualImmutable(fromJS({
        street: '2870 Gateway Oaks Dr',
        city: 'Sacramento',
        state: 'California',
        zip: '95833',
        type: 'Work',
        legacy_descriptor: {legacy_id: 'ABC123'},
        zipError: null,
      }))
    })

    it('includes zip validation errors', () => {
      const badZipAddress = address
        .set('zip', '012')
        .deleteIn(['legacy_descriptor', 'legacy_id'])
      const zipErrors = formatForDisplay(badZipAddress).get('zipError')
      expect(zipErrors).not.toEqual(null)
      expect(zipErrors.size).toEqual(1)
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
  })
})
