import {
  ferbToPlain,
  addressFromFerb,
  isReadWrite,
  isReadOnly,
  unwrap,
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

    describe('a blank address', () => {
      let address

      beforeEach(() => {
        address = addressFromFerb({})
      })

      it('has an undefined id', () => {
        expect(address.has('id')).toEqual(true)
        expect(address.get('id')).toBeUndefined()
      })

      it('has an empty, untouched street', () => {
        const street = address.get('street')
        expect(street.has('value')).toEqual(true)
        expect(street.get('value')).toBeUndefined()
        expect(street.has('errors')).toEqual(false)
        expect(street.get('touched')).toEqual(false)
      })
      it('has an empty, untouched city', () => {
        const city = address.get('city')
        expect(city.has('value')).toEqual(true)
        expect(city.get('value')).toBeUndefined()
        expect(city.has('errors')).toEqual(false)
        expect(city.get('touched')).toEqual(false)
      })
      it('has an empty, untouched state', () => {
        const state = address.get('state')
        expect(state.has('value')).toEqual(true)
        expect(state.get('value')).toBeUndefined()
        expect(state.has('errors')).toEqual(false)
        expect(state.get('touched')).toEqual(false)
      })
      it('has an empty, untouched zip', () => {
        const zip = address.get('zip')
        expect(zip.has('value')).toEqual(true)
        expect(zip.get('value')).toBeUndefined()
        expect(zip.has('errors')).toEqual(false)
        expect(zip.get('touched')).toEqual(false)
      })
      it('has an empty, untouched type', () => {
        const type = address.get('type')
        expect(type.has('value')).toEqual(true)
        expect(type.get('value')).toBeUndefined()
        expect(type.has('errors')).toEqual(false)
        expect(type.get('touched')).toEqual(false)
      })
      it('has an empty, untouched legacy_id', () => {
        const legacy_id = address.get('legacy_id')
        expect(legacy_id.has('value')).toEqual(true)
        expect(legacy_id.get('value')).toBeUndefined()
        expect(legacy_id.has('errors')).toEqual(false)
        expect(legacy_id.get('touched')).toEqual(false)
      })
      it('has an empty, untouched legacy_descriptor', () => {
        const legacy_descriptor = address.get('legacy_descriptor')
        expect(legacy_descriptor.has('value')).toEqual(true)
        expect(legacy_descriptor.get('value')).toBeUndefined()
        expect(legacy_descriptor.has('errors')).toEqual(false)
        expect(legacy_descriptor.get('touched')).toEqual(false)
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

      it('has an id', () => {
        expect(address.get('id')).toEqual('ABC')
      })
      it('has the street_address from API as street', () => {
        const street = address.get('street')
        expect(street.get('value')).toEqual('2870 Gateway Oaks Drive')
        expect(street.has('errors')).toEqual(false)
        expect(street.get('touched')).toEqual(false)
      })
      it('has an untouched city', () => {
        const city = address.get('city')
        expect(city.get('value')).toEqual('Sacramento')
        expect(city.has('errors')).toEqual(false)
        expect(city.get('touched')).toEqual(false)
      })
      it('has an untouched state', () => {
        const state = address.get('state')
        expect(state.get('value')).toEqual('CA')
        expect(state.has('errors')).toEqual(false)
        expect(state.get('touched')).toEqual(false)
      })
      it('has an untouched zip', () => {
        const zip = address.get('zip')
        expect(zip.get('value')).toEqual('95833')
        expect(zip.has('errors')).toEqual(false)
        expect(zip.get('touched')).toEqual(false)
      })
      it('has an untouched type', () => {
        const type = address.get('type')
        expect(type.get('value')).toEqual('Some Type')
        expect(type.has('errors')).toEqual(false)
        expect(type.get('touched')).toEqual(false)
      })
      it('has an untouched legacy_id', () => {
        const legacy_id = address.get('legacy_id')
        expect(legacy_id.get('value')).toEqual('123')
        expect(legacy_id.has('errors')).toEqual(false)
        expect(legacy_id.get('touched')).toEqual(false)
      })
      it('has an untouched legacy_descriptor', () => {
        const legacy_descriptor = address.get('legacy_descriptor')
        expect(legacy_descriptor.get('value')).toEqual('Some Descriptor')
        expect(legacy_descriptor.has('errors')).toEqual(false)
        expect(legacy_descriptor.get('touched')).toEqual(false)
      })
    })
  })

  describe('isReadWrite', () => {
    it('is false for a touchable address with a legacy_id', () => {
      const address = fromJS({
        legacy_id: {touched: false, value: '123'},
      })
      expect(isReadWrite(address)).toEqual(false)
    })
    it('is true for a touchable address with no legacy_id', () => {
      const address = fromJS({
        legacy_id: {touched: false, value: undefined},
      })
      expect(isReadWrite(address)).toEqual(true)
    })
  })
  describe('isReadOnly', () => {
    it('is true for a touchable address with a legacy_id', () => {
      const address = fromJS({
        legacy_id: {touched: false, value: '123'},
      })
      expect(isReadOnly(address)).toEqual(true)
    })
    it('is false for a touchable address with no legacy_id', () => {
      const address = fromJS({
        legacy_id: {touched: false, value: undefined},
      })
      expect(isReadOnly(address)).toEqual(false)
    })
  })

  describe('unwrap', () => {
    it('returns an immutable map of values', () => {
      const address = fromJS({
        id: 'ABC',
        street: {touched: false, value: '2870 Gateway Oaks Drive'},
        city: {touched: false, value: 'Sacramento'},
        state: {touched: false, value: 'CA'},
        zip: {touched: false, value: '95833'},
        type: {touched: false, value: 'Some Type'},
        legacy_id: {touched: false, value: '123'},
        legacy_descriptor: {touched: false, value: 'Some Descriptor'},
      })

      const unwrappedAddress = unwrap(address)

      expect(unwrappedAddress).toEqualImmutable(fromJS({
        id: 'ABC',
        street: '2870 Gateway Oaks Drive',
        city: 'Sacramento',
        state: 'CA',
        zip: '95833',
        type: 'Some Type',
        legacy_id: '123',
        legacy_descriptor: 'Some Descriptor',
      }))
    })
  })
})
