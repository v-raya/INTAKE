import {sortAddressType} from 'utils/SortAddressTypes'

const address = [
  {
    zip: '0',
    street: ' Menomonie Trail',
    legacy_descriptor: {
      legacy_id: 'BfDkTjB0Ht',
      legacy_ui_id: '0662-5672-0726-9001109',
      legacy_last_updated: '2018-07-24T15:06:50.945-0700',
      legacy_table_name: 'ADDRS_T',
      legacy_table_description: 'Address',
    },
    city: 'San Francisco',
    state: 'California',
    type: 'Home',
    id: null,
    zipError: null,
  },
  {
    zip: '0',
    street: ' Lyons Junction',
    legacy_descriptor: {
      legacy_id: 'JAWH3I50Ht',
      legacy_ui_id: '1088-8427-1139-7001109',
      legacy_last_updated: '2018-07-24T15:06:50.945-0700',
      legacy_table_name: 'ADDRS_T',
      legacy_table_description: 'Address',
    },
    city: 'California',
    state: 'California',
    type: 'Placement Home',
    id: null,
    zipError: null,
  },
  {
    zip: '92530',
    street: '4451 Anniversary Parkway',
    legacy_descriptor: {
      legacy_id: '8Uywd2T0Ht',
      legacy_ui_id: '0482-7864-2288-5001109',
      legacy_last_updated: '2018-07-24T15:06:50.945-0700',
      legacy_table_name: 'ADDRS_T',
      legacy_table_description: 'Address',
    },
    city: 'Lake Elsinore',
    state: 'California',
    type: 'Homeless',
    id: null,
    zipError: null,
  },
  {
    zip: '92530',
    street: '4451 Anniversary Parkway',
    legacy_descriptor: {
      legacy_id: '8Uywd2T0Ht',
      legacy_ui_id: '0482-7864-2288-5001109',
      legacy_last_updated: '2018-07-24T15:06:50.945-0700',
      legacy_table_name: 'ADDRS_T',
      legacy_table_description: 'Address',
    },
    city: 'Lake Elsinore',
    state: 'California',
    type: 'Penal Institution',
    id: null,
    zipError: null,
  },
  {
    zip: '0',
    street: ' Menomonie Trail',
    legacy_descriptor: {
      legacy_id: 'BfDkTjB0Ht',
      legacy_ui_id: '0662-5672-0726-9001109',
      legacy_last_updated: '2018-07-24T15:06:50.945-0700',
      legacy_table_name: 'ADDRS_T',
      legacy_table_description: 'Address',
    },
    city: 'San Francisco',
    state: 'California',
    type: 'Common',
    id: null,
    zipError: null,
  },
]
describe('sorts placement homes before residences', () => {
  it('sorts the address', () => {
    expect(sortAddressType(address)).toEqual([
      {
        zip: '0',
        street: ' Lyons Junction',
        legacy_descriptor: {
          legacy_id: 'JAWH3I50Ht',
          legacy_ui_id: '1088-8427-1139-7001109',
          legacy_last_updated: '2018-07-24T15:06:50.945-0700',
          legacy_table_name: 'ADDRS_T',
          legacy_table_description: 'Address',
        },
        city: 'California',
        state: 'California',
        type: 'Placement Home',
        id: null,
        zipError: null,
      },
      {
        zip: '0',
        street: ' Menomonie Trail',
        legacy_descriptor: {
          legacy_id: 'BfDkTjB0Ht',
          legacy_ui_id: '0662-5672-0726-9001109',
          legacy_last_updated: '2018-07-24T15:06:50.945-0700',
          legacy_table_name: 'ADDRS_T',
          legacy_table_description: 'Address',
        },
        city: 'San Francisco',
        state: 'California',
        type: 'Home',
        id: null,
        zipError: null,
      },
      {
        zip: '0',
        street: ' Menomonie Trail',
        legacy_descriptor: {
          legacy_id: 'BfDkTjB0Ht',
          legacy_ui_id: '0662-5672-0726-9001109',
          legacy_last_updated: '2018-07-24T15:06:50.945-0700',
          legacy_table_name: 'ADDRS_T',
          legacy_table_description: 'Address',
        },
        city: 'San Francisco',
        state: 'California',
        type: 'Common',
        id: null,
        zipError: null,
      },
      {
        zip: '92530',
        street: '4451 Anniversary Parkway',
        legacy_descriptor: {
          legacy_id: '8Uywd2T0Ht',
          legacy_ui_id: '0482-7864-2288-5001109',
          legacy_last_updated: '2018-07-24T15:06:50.945-0700',
          legacy_table_name: 'ADDRS_T',
          legacy_table_description: 'Address',
        },
        city: 'Lake Elsinore',
        state: 'California',
        type: 'Homeless',
        id: null,
        zipError: null,
      },
      {
        zip: '92530',
        street: '4451 Anniversary Parkway',
        legacy_descriptor: {
          legacy_id: '8Uywd2T0Ht',
          legacy_ui_id: '0482-7864-2288-5001109',
          legacy_last_updated: '2018-07-24T15:06:50.945-0700',
          legacy_table_name: 'ADDRS_T',
          legacy_table_description: 'Address',
        },
        city: 'Lake Elsinore',
        state: 'California',
        type: 'Penal Institution',
        id: null,
        zipError: null,
      },
    ])
  })
})
