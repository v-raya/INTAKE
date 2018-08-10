import {addressFromFerb} from 'data/address'
import {Map} from 'immutable'

describe('Address', () => {
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
})
