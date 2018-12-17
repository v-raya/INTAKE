import 'babel-polyfill'
import {takeEvery, put, call, select} from 'redux-saga/effects'
import {get} from 'utils/http'
import {
  createSnapshotPerson,
  createSnapshotPersonSaga,
} from 'sagas/createSnapshotPersonSaga'
import {CREATE_SNAPSHOT_PERSON} from 'actions/personCardActions'
import * as personCardActions from 'actions/personCardActions'
import {fetchHistoryOfInvolvementsByClientIds} from 'actions/historyOfInvolvementActions'
import {fetchRelationships} from 'actions/relationshipsActions'
import {selectClientIds} from 'selectors/participantSelectors'

describe('createSnapshotPersonSaga', () => {
  it('creates participant on CREATE_SNAPSHOT_PERSON', () => {
    const gen = createSnapshotPersonSaga()
    expect(gen.next().value).toEqual(takeEvery(CREATE_SNAPSHOT_PERSON, createSnapshotPerson))
  })
})

describe('createSnapshotPerson', () => {
  const id = '1'
  const doraPerson = {
    first_name: 'David',
    last_name: 'Camerati',
    gender: 'male',
    ssn: '',
    roles: [],
    addresses: [
      {
        messages: [],
        type: 'Home',
        street_address: '11 Holmberg Plaza',
        city: 'Davis',
        state: 'CA',
        zip: '0',
        legacy_descriptor: {
          legacy_id: 'KdAsTeq0Py',
          legacy_ui_id: '1171-8946-3920-8001610',
          legacy_last_updated: '2018-07-24T15:06:50.945-0700',
          legacy_table_name: 'ADDRS_T',
          legacy_table_description: 'Address',
        },
      },
    ],
    races: [],
    ethnicity: [
      {
        hispanic_latino_origin: 'Unknown',
        ethnicity_detail: [],
      },
    ],
    middle_name: '',
    name_suffix: '',
    approximate_age: '25',
    approximate_age_units: 'years',
    languages: [],
    phone_numbers: [],
    sealed: false,
    sensitive: false,
    probation_youth: false,
    legacy_descriptor: {
      legacy_id: 'I4lIS6a0Py',
      legacy_ui_id: '1026-7676-5757-6001610',
      legacy_last_updated: '2018-07-24T15:08:37.948-0700',
      legacy_table_name: 'CLIENT_T',
      legacy_table_description: 'Client',
    },
    csec: [],
  }

  const participant = {
    id,
    first_name: 'David',
    last_name: 'Camerati',
    gender: 'male',
    ssn: '',
    roles: [],
    addresses: [
      {
        messages: [],
        type: 'Home',
        street_address: '11 Holmberg Plaza',
        city: 'Davis',
        state: 'CA',
        zip: '0',
        legacy_descriptor: {
          legacy_id: 'KdAsTeq0Py',
          legacy_ui_id: '1171-8946-3920-8001610',
          legacy_last_updated: '2018-07-24T15:06:50.945-0700',
          legacy_table_name: 'ADDRS_T',
          legacy_table_description: 'Address',
        },
      },
    ],
    races: [],
    ethnicity: [
      {
        hispanic_latino_origin: 'Unknown',
        ethnicity_detail: [],
      },
    ],
    middle_name: '',
    name_suffix: '',
    approximate_age: '25',
    approximate_age_units: 'years',
    languages: [],
    phone_numbers: [],
    sealed: false,
    sensitive: false,
    probation_youth: false,
    legacy_descriptor: {
      legacy_id: 'I4lIS6a0Py',
      legacy_ui_id: '1026-7676-5757-6001610',
      legacy_last_updated: '2018-07-24T15:08:37.948-0700',
      legacy_table_name: 'CLIENT_T',
      legacy_table_description: 'Client',
    },
    csec: [],
  }
  const action = personCardActions.createSnapshotPerson(id)
  it('fetches participant, relationships, and history', () => {
    const gen = createSnapshotPerson(action)
    expect(gen.next().value).toEqual(call(get, `/api/v1/people/${id}`))
    expect(gen.next(doraPerson).value).toEqual(
      put(personCardActions.createPersonSuccess(participant))
    )
    expect(gen.next().value).toEqual(
      select(selectClientIds)
    )
    expect(gen.next(['1']).value).toEqual(
      put(fetchRelationships(['1']))
    )
    expect(gen.next().value).toEqual(
      put(fetchHistoryOfInvolvementsByClientIds(['1']))
    )
  })

  it('puts errors when non-403 errors are thrown', () => {
    const gen = createSnapshotPerson(action)
    expect(gen.next().value).toEqual(call(get, `/api/v1/people/${id}`))
    const error = {responseJSON: 'some error'}
    expect(gen.throw(error).value).toEqual(
      put(personCardActions.createPersonFailure('some error'))
    )
  })

  it('calls an alert when the error status is 403', () => {
    const gen = createSnapshotPerson(action)
    expect(gen.next().value).toEqual(call(get, `/api/v1/people/${id}`))
    const error = {responseJSON: 'some error', status: 403}
    expect(gen.throw(error).value).toEqual(
      call(alert, 'You are not authorized to add this person.')
    )
  })
})
