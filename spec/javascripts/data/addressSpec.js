import {
  ferbToPlain,
  plainToFerb,
  addressFromFerb,
  isReadWrite,
  isReadOnly,
  unwrap,
  formatForDisplay,
} from 'data/address'
import {fromJS, Map} from 'immutable'
import * as matchers from 'jasmine-immutable-matchers'

describe('Address', () => {
  beforeEach(() => jasmine.addMatchers(matchers))

  describe('ferbToPlain', () => {
    it('returns an Immutable Map', () => {
      expect(Map.isMap(ferbToPlain(Map()))).toEqual(true)
    })

    it('filters out unknown fields', () => {
      const address = ferbToPlain(fromJS({foo: 'bar'}))
      expect(address.get('foo')).toBeUndefined()
    })

    it('handles an address persisted to legacy', () => {
      const address = ferbToPlain(fromJS({
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
      const address = ferbToPlain(fromJS({
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

  describe('addressFromFerb', () => {
    it('returns an Immutable Map', () => {
      expect(Map.isMap(addressFromFerb({}))).toEqual(true)
    })

    it('strips unknown fields', () => {
      const address = addressFromFerb({foo: 'bar'})
      expect(address.has('foo')).toEqual(false)
    })

    describe('a blank address', () => {
      let address

      beforeEach(() => {
        address = addressFromFerb({})
      })

      it('has an empty touched Map', () => {
        expect(address.get('touched')).toEqualImmutable(Map())
      })

      it('has undefined fields', () => {
        expect(address.has('id')).toEqual(true)
        expect(address.get('id')).toBeUndefined()
        expect(address.has('street')).toEqual(true)
        expect(address.get('street')).toBeUndefined()
        expect(address.has('city')).toEqual(true)
        expect(address.get('city')).toBeUndefined()
        expect(address.has('state')).toEqual(true)
        expect(address.get('state')).toBeUndefined()
        expect(address.has('zip')).toEqual(true)
        expect(address.get('zip')).toBeUndefined()
        expect(address.has('type')).toEqual(true)
        expect(address.get('type')).toBeUndefined()
      })

      it('has a null legacy_descriptor', () => {
        expect(address.has('legacy_descriptor')).toEqual(true)
        expect(address.get('legacy_descriptor')).toEqual(null)
      })

      it('has no legacy_id', () => {
        // Use the legacy_descriptor instead
        expect(address.has('legacy_id')).toEqual(false)
      })
    })

    describe('a full address', () => {
      let address

      beforeEach(() => {
        address = addressFromFerb({
          id: 'ABC',
          street_address: '2870 Gateway Oaks Drive',
          city: 'Sacramento',
          state: 'CA',
          zip: '95833',
          type: 'Some Type',
          legacy_id: '123',
          legacy_descriptor: 'Some Descriptor',
        })
      })

      it('has an empty touched fields Map', () => {
        expect(address.get('touched')).toEqualImmutable(Map())
      })

      it('has all of its fields', () => {
        expect(address.get('id')).toEqual('ABC')
        expect(address.get('street')).toEqual('2870 Gateway Oaks Drive')
        expect(address.get('city')).toEqual('Sacramento')
        expect(address.get('state')).toEqual('CA')
        expect(address.get('zip')).toEqual('95833')
        expect(address.get('type')).toEqual('Some Type')
        expect(address.get('legacy_descriptor')).toEqual('Some Descriptor')
      })

      it('has no legacy_id', () => {
        // Use the legacy_descriptor instead
        expect(address.has('legacy_id')).toEqual(false)
      })
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
        legacy_id: 'ABC123',
        zipError: null,
      }))
    })

    it('includes zip validation errors', () => {
      const badZipAddress = address
        .set('zip', '012')
        .deleteIn(['legacy_descriptor', 'legacy_id'])
      const zipErrors = formatForDisplay(badZipAddress).get('zipError')
      expect(zipErrors).not.toEqual(null)
      expect(zipErrors.length).toEqual(1)
    })
  })

  describe('plainToFerb', () => {
    it('returns an Immutable Map', () => {
      expect(Map.isMap(plainToFerb(Map()))).toEqual(true)
    })

    it('handles an address persisted to legacy', () => {
      const address = plainToFerb(fromJS({
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
      const address = plainToFerb(fromJS({
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
  })
})
