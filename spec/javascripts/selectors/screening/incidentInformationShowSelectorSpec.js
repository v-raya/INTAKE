import {fromJS, Map} from 'immutable'
import {
  getIncidentDateSelector,
  getIncidentCountySelector,
  getAddressSelector,
  getLocationTypeSelector,
  getCurrentLocationOfChildrenSelector,
  getErrorsSelector,
} from 'selectors/screening/incidentInformationShowSelector'
import {selectAddressCounties} from 'selectors/systemCodeSelectors'
import * as matchers from 'jasmine-immutable-matchers'
import moment from 'moment'

describe('incidentInformationShowSelectors', () => {
  beforeEach(() => jasmine.addMatchers(matchers))

  const emptyState = fromJS({incident_address: {}})

  describe('getIncidentDateSelector', () => {
    it('return an incident date or empty string if there is no incident date', () => {
      const screening = {
        incident_date: '2009-01-02',
      }
      const state = fromJS({screening})
      expect(getIncidentDateSelector(state)).toEqual('01/02/2009')
      expect(getIncidentDateSelector(emptyState)).toEqual('')
    })
  })

  describe('getIncidentCountySelector', () => {
    it('return an incident county or empty string if there is no incident county', () => {
      const screening = {
        incident_county: '99',
      }
      const addressCounties = [
        {code: '01', value: 'San Francisco', category: 'address_county'},
        {code: '02', value: 'Monterey', category: 'address_county'},
        {code: '03', value: 'Sacramento', category: 'county_type'},
        {code: '99', value: 'State Of California', category: 'address_county'},
      ]
      const state = fromJS({screening, systemCodes: {addressCounties}})
      expect(getIncidentCountySelector(state, selectAddressCounties)).toEqual('State Of California')
      expect(getIncidentCountySelector(emptyState, selectAddressCounties)).toEqual('')
    })
  })

  describe('getAddressSelector', () => {
    it('return address properties or an object with empty string if there is no address', () => {
      const screening = {
        incident_address: {
          city: 'Sacramento',
          street_address: '1234 C Street',
          state: 'CA',
          zip: '98765',
        },
      }
      const state = fromJS({screening})
      expect(getAddressSelector(state)).toEqualImmutable(fromJS({
        city: 'Sacramento',
        streetAddress: '1234 C Street',
        state: 'California',
        zip: '98765',
      }))
      expect(getAddressSelector(emptyState)).toEqualImmutable(Map({
        city: '',
        streetAddress: '',
        state: '',
        zip: '',
      }))
    })
  })

  describe('getLocationTypeSelector', () => {
    it('returns a location type or empty string if there is no location type', () => {
      const screening = {
        location_type: 'location type',
      }
      const state = fromJS({screening})
      expect(getLocationTypeSelector(state)).toEqual('location type')
      expect(getLocationTypeSelector(emptyState)).toEqual('')
    })
  })

  describe('getErrorsSelector', () => {
    it('returns an error if the incident date fails to validate', () => {
      const screening = {
        incident_date: moment().add(10, 'days').toISOString(),
        incident_address: {street_address: '123 Main St', city: 'Sacramento'},
      }
      const state = fromJS({screening})
      expect(getErrorsSelector(state)).toEqualImmutable(fromJS({
        incident_date: ['The incident date and time cannot be in the future.'],
        incident_address: [],
        incident_city: [],
      }))
    })

    it('returns an error if the indicent address is not provided', () => {
      const screening = {
        incident_date: moment().toISOString(),
        incident_address: {},
      }
      const state = fromJS({screening})
      expect(getErrorsSelector(state)).toEqualImmutable(fromJS({
        incident_date: [],
        incident_address: ['The incident address must be provided.'],
        incident_city: ['The incident address city must be provided.'],
      }))
    })

    it('does not return an error if the incident successfully validates', () => {
      const screening = {
        incident_date: moment().toISOString(),
        incident_address: {street_address: '123 Main St', city: 'Sacramento'},
      }
      const state = fromJS({screening})
      expect(getErrorsSelector(state)).toEqualImmutable(fromJS({
        incident_date: [],
        incident_address: [],
        incident_city: [],
      }))
    })
  })
  describe('getCurrentLocationOfChildrenSelector', () => {
    it('returns a value when it is present', () => {
      const screening = {
        current_location_of_children: 'the current location of child is in los angeles',
      }
      const state = fromJS({screening})
      expect(getCurrentLocationOfChildrenSelector(state)).toEqual('the current location of child is in los angeles')
    })
    it('returns undefined when no value is present', () => {
      const screening = {}
      const state = fromJS({screening})
      expect(getCurrentLocationOfChildrenSelector(state)).toEqual(undefined)
    })
  })
})
