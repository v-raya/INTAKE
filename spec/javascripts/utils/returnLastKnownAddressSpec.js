import Immutable from 'immutable'
import {List, fromJS} from 'immutable'
import {returnLastKnownAddress} from 'utils/returnLastKnownAddress'

describe('returnLastKnownAddress', () => {
  it('returns the last know residence address', () => {
    const addresses = Immutable.fromJS([
      {
        zip: '34567',
        city: 'San Francisco',
        state_name: 'California',
        county: {
          description: 'Santa Cruz',
          id: '1111',
        },
        effective_start_date: '2001-02-10',
        legacy_descriptor: {
          legacy_last_updated: '2004-02-15T10:55:53.067-0800',
          legacy_id: 'BfDkTjB0Ht',
          legacy_ui_id: '0662-5672-0726-9001109',
          legacy_table_name: 'ADDRS_T',
          legacy_table_description: 'Address',
        },
        active: 'true',
        id: 'BfDkTjB0Ht',
        state: {
          description: 'California',
          id: '1828',
        },
        state_code: 'CA',
        type: {
          description: 'Permanent Mailing Address',
          id: '31',
        },
        street_name: 'Menomonie Trail',
      },
      {
        zip: '12345',
        city: 'California',
        state_name: 'California',
        county: {
          description: 'Santa Cruz',
          id: '1111',
        },
        effective_start_date: '2005-02-07',
        legacy_descriptor: {
          legacy_last_updated: '2007-02-23T10:22:53.067-0800',
          legacy_id: 'JAWH3I50Ht',
          legacy_ui_id: '1088-8427-1139-7001109',
          legacy_table_name: 'ADDRS_T',
          legacy_table_description: 'Address',
        },
        active: 'true',
        id: 'JAWH3I50Ht',
        state: {
          description: 'California',
          id: '1828',
        },
        state_code: 'CA',
        type: {
          description: 'Business',
          id: '27',
        },
        street_name: 'Lyons Junction',
      },
      {
        zip: '92530',
        city: 'Lake Elsinore',
        county: {
          description: 'Riverside',
          id: '1100',
        },
        legacy_descriptor: {
          legacy_last_updated: '2003-01-20T08:55:28.320-0800',
          legacy_id: '8Uywd2T0Ht',
          legacy_ui_id: '0482-7864-2288-5001109',
          legacy_table_name: 'ADDRS_T',
          legacy_table_description: 'Address',
        },
        active: 'true',
        type: {
          description: 'Residence',
          id: '32',
        },
        street_name: 'Anniversary Parkway',
        state_name: 'California',
        street_number: '4451',
        effective_start_date: '2003-01-03',
        id: '8Uywd2T0Ht',
        state: {
          description: 'California',
          id: '1828',
        },
        state_code: 'CA',
      },
    ])
    expect(returnLastKnownAddress(addresses)).toEqual(fromJS({
      zip: '92530',
      city: 'Lake Elsinore',
      county: {
        description: 'Riverside',
        id: '1100',
      },
      legacy_descriptor: {
        legacy_last_updated: '2003-01-20T08:55:28.320-0800',
        legacy_id: '8Uywd2T0Ht',
        legacy_ui_id: '0482-7864-2288-5001109',
        legacy_table_name: 'ADDRS_T',
        legacy_table_description: 'Address',
      },
      active: 'true',
      type: {
        description: 'Residence',
        id: '32',
      },
      street_name: 'Anniversary Parkway',
      state_name: 'California',
      street_number: '4451',
      effective_start_date: '2003-01-03',
      id: '8Uywd2T0Ht',
      state: {
        description: 'California',
        id: '1828',
      },
      state_code: 'CA',
    }))
  })

  it('return null when null is passed', () => {
    expect(returnLastKnownAddress(null)).toEqual(null)
  })

  it('return null when undefined is passed', () => {
    expect(returnLastKnownAddress(undefined)).toEqual(null)
  })

  it('return null when emtpy string is passed', () => {
    expect(returnLastKnownAddress('')).toEqual(null)
  })

  it('return null when 0 is passed', () => {
    expect(returnLastKnownAddress(0)).toEqual(null)
  })

  it('return null when false is passed', () => {
    expect(returnLastKnownAddress(false)).toEqual(null)
  })

  it('return undefined when empty List is passed', () => {
    expect(returnLastKnownAddress(List())).toEqual(undefined)
  })
})
