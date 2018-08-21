import {fromJS, List} from 'immutable'
import {
  getIncidentDateSelector,
  getIncidentCountySelector,
  getAddressSelector,
  getLocationTypeSelector,
  getScreeningWithEditsSelector,
  getLocationOfChildrenSelector,
  getVisibleErrorsSelector,
} from 'selectors/screening/incidentInformationFormSelector'
import {selectAddressCounties} from 'selectors/systemCodeSelectors'
import * as matchers from 'jasmine-immutable-matchers'
import moment from 'moment'

describe('incidentInformationFormSelectors', () => {
  beforeEach(() => jasmine.addMatchers(matchers))

  const emptyState = fromJS({incident_address: {}})

  describe('getIncidentDateSelector', () => {
    it('return an incident date or empty string if there is no incident date', () => {
      const incidentInformationForm = {
        incident_date: {
          value: '2009-01-02',
        },
      }
      const state = fromJS({incidentInformationForm})
      expect(getIncidentDateSelector(state)).toEqual('2009-01-02')
      expect(getIncidentDateSelector(emptyState)).toEqual('')
    })
  })

  describe('getIncidentCountySelector', () => {
    it('return an incident county or undefined if there is no incident county', () => {
      const incidentInformationForm = {
        incident_county: {
          value: '99',
        },
      }
      const addressCounties = [
        {code: '01', value: 'San Francisco', category: 'address_county'},
        {code: '02', value: 'Monterey', category: 'address_county'},
        {code: '03', value: 'Sacramento', category: 'county_type'},
        {code: '99', value: 'State Of California', category: 'address_county'},
      ]
      const state = fromJS({incidentInformationForm, systemCodes: {addressCounties}})
      expect(getIncidentCountySelector(state, selectAddressCounties)).toEqual('99')
      expect(getIncidentCountySelector(emptyState, selectAddressCounties)).toEqual('')
    })
  })

  describe('getAddressSelector', () => {
    it('return address properties or an object with empty string if there is no address', () => {
      const incidentInformationForm = {
        incident_address: {
          id: '1',
          city: {
            value: 'Sacramento',
          },
          street_address: {
            value: '1234 C Street',
          },
          state: {
            value: 'CA',
          },
          zip: {
            value: '98765',
          },
        },
      }
      const state = fromJS({incidentInformationForm})
      expect(getAddressSelector(state)).toEqualImmutable(fromJS({
        id: '1',
        city: 'Sacramento',
        streetAddress: '1234 C Street',
        state: 'CA',
        zip: '98765',
      }))
      expect(getAddressSelector(emptyState)).toEqualImmutable(fromJS({
        id: undefined,
        city: '',
        streetAddress: '',
        state: '',
        zip: '',
      }))
    })
  })

  describe('getLocationTypeSelector', () => {
    it('returns a location type or empty string if there is no location type', () => {
      const incidentInformationForm = {
        location_type: {
          value: 'location type',
        },
      }
      const state = fromJS({incidentInformationForm})
      expect(getLocationTypeSelector(state)).toEqual('location type')
      expect(getLocationTypeSelector(emptyState)).toEqual('')
    })
  })

  describe('getLocationOfChildrenSelector', () => {
    it('returns a value when it is present', () => {
      const incidentInformationForm = {current_location_of_children: {value: 'something is good'}}
      const state = fromJS({incidentInformationForm})
      expect(getLocationOfChildrenSelector(state)).toEqual('something is good')
    })
    it('returns a undefined when location of child is not defined ', () => {
      const incidentInformationForm = {}
      const state = fromJS({incidentInformationForm})
      expect(getLocationOfChildrenSelector(state)).toEqual(undefined)
    })
  })

  describe('getScreeningWithEditsSelector', () => {
    const incidentInformationForm = {
      incident_date: {
        value: '1/3/2009',
      },
      incident_county: {
        value: 'new county',
      },
      incident_address: {
        id: '1',
        street_address: {
          value: 'new address',
        },
        city: {
          value: 'new city',
        },
        state: {
          value: 'new state',
        },
        zip: {
          value: 'new zip',
        },
      },
      location_type: {
        value: 'new location type',
      },
      current_location_of_children: {
        value: 'new location of children',
      },
    }
    it('returns the screening with edits', () => {
      const screening = {
        incident_date: '1/2/2009',
        incident_county: 'old county',
        incident_address: {
          id: '1',
          street_address: 'old address',
          city: 'old city',
          state: 'old state',
          zip: 'old zip',
        },
        location_type: 'old location type',
        current_location_of_children: 'Old location of children',
      }
      const state = fromJS({incidentInformationForm, screening})
      expect(getScreeningWithEditsSelector(state)).toEqualImmutable(fromJS({
        incident_date: '1/3/2009',
        incident_county: 'new county',
        incident_address: {
          id: '1',
          street_address: 'new address',
          city: 'new city',
          state: 'new state',
          zip: 'new zip',
        },
        location_type: 'new location type',
        current_location_of_children: 'new location of children',
        participants: [],
      }))
    })

    it('takes the participants from the participants list', () => {
      const screening = {
        incident_date: '1/2/2009',
        incident_county: 'old county',
        incident_address: {
          id: '1',
          street_address: 'old address',
          city: 'old city',
          state: 'old state',
          zip: 'old zip',
        },
        location_type: 'old location type',
        current_location_of_children: 'Old location of children',
        participants: [{id: '456', first_name: 'Luigi'}],
      }
      const participants = [{id: '123', first_name: 'Mario', addresses: []}]
      const state = fromJS({incidentInformationForm, screening, participants})
      expect(getScreeningWithEditsSelector(state)).toEqualImmutable(fromJS({
        incident_date: '1/3/2009',
        incident_county: 'new county',
        incident_address: {
          id: '1',
          street_address: 'new address',
          city: 'new city',
          state: 'new state',
          zip: 'new zip',
        },
        location_type: 'new location type',
        current_location_of_children: 'new location of children',
        participants,
      }))
    })

    it('converts addresses to the format Ferb expects', () => {
      const screening = {
        incident_date: '1/2/2009',
        incident_county: 'old county',
        incident_address: {
          id: '1',
          street_address: 'old address',
          city: 'old city',
          state: 'old state',
          zip: 'old zip',
        },
        location_type: 'old location type',
        current_location_of_children: 'Old location of children',
        participants: [{id: '456', first_name: 'Luigi'}],
      }
      const participants = [{
        id: '1',
        first_name: 'Mario',
        addresses: [{
          id: '1',
          street: '1000 Peach Castle',
          city: 'World 1-1',
          state: 'Mushroom Kingdom',
          zip: '00001',
          type: 'Home',
          legacy_descriptor: {legacy_id: 'ABC123'},
        }],
      }]
      const state = fromJS({incidentInformationForm, screening, participants})
      expect(getScreeningWithEditsSelector(state)).toEqualImmutable(fromJS({
        incident_date: '1/3/2009',
        incident_county: 'new county',
        incident_address: {
          id: '1',
          street_address: 'new address',
          city: 'new city',
          state: 'new state',
          zip: 'new zip',
        },
        location_type: 'new location type',
        current_location_of_children: 'new location of children',
        participants: [{
          id: '1',
          first_name: 'Mario',
          addresses: [{
            id: '1',
            street_address: '1000 Peach Castle',
            city: 'World 1-1',
            state: 'Mushroom Kingdom',
            zip: '00001',
            type: 'Home',
            legacy_descriptor: {legacy_id: 'ABC123'},
          }],
        }],
      }))
    })

    it('returns the screening with empty address', () => {
      const screening = {
        incident_date: '1/2/2009',
        incident_county: 'old county',
        incident_address: {},
        location_type: 'old location type',
        current_location_of_children: 'old location of children',
      }
      const incidentInformationForm = {
        incident_date: {
          value: '1/3/2009',
        },
        incident_county: {
          value: 'new county',
        },
        incident_address: {},
        location_type: {
          value: 'new location type',
        },
        current_location_of_children: {
          value: 'new location of children',
        },
      }
      const state = fromJS({incidentInformationForm, screening})
      expect(getScreeningWithEditsSelector(state)).toBeImmutable()
    })
  })

  describe('getVisibleErrorsSelector', () => {
    it('returns an error if the field has a validation and is touched', () => {
      const incidentInformationForm = {
        incident_date: {
          value: moment().add(10, 'days').toISOString(),
          touched: true,
        },
      }
      const state = fromJS({incidentInformationForm})
      expect(getVisibleErrorsSelector(state).get('incident_date'))
        .toEqualImmutable(List(['The incident date cannot be in the future.']))
    })

    it('returns an error if the street_address has a validation and is touched', () => {
      const incidentInformationForm = {
        incident_address: {
          street_address: {
            value: '',
            touched: true,
          },
        },
      }
      const state = fromJS({incidentInformationForm})
      expect(getVisibleErrorsSelector(state).get('incident_address').get('street_address'))
        .toEqualImmutable(List(['The incident address must be provided.']))
    })

    it('does not return an error if the field has not been touched', () => {
      const incidentInformationForm = {
        incident_date: {
          value: moment(),
          touched: false,
        },
      }
      const state = fromJS({incidentInformationForm})
      expect(getVisibleErrorsSelector(state).get('incident_date'))
        .toEqualImmutable(List())
    })
  })
})
