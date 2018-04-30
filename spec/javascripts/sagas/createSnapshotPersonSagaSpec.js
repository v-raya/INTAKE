import 'babel-polyfill'
import {fromJS} from 'immutable'
import {takeLatest, put, call, select} from 'redux-saga/effects'
import {get} from 'utils/http'
import {
  createSnapshotPerson,
  createSnapshotPersonSaga,
} from 'sagas/createSnapshotPersonSaga'
import {CREATE_SNAPSHOT_PERSON} from 'actions/personCardActions'
import * as personCardActions from 'actions/personCardActions'
import {fetchHistoryOfInvolvementsByClientIds} from 'actions/historyOfInvolvementActions'
import {fetchRelationships} from 'actions/relationshipsActions'
import {getClientIdsSelector} from 'selectors/clientSelectors'

describe('createSnapshotPersonSaga', () => {
  it('creates participant on CREATE_SNAPSHOT_PERSON', () => {
    const gen = createSnapshotPersonSaga()
    expect(gen.next().value).toEqual(takeLatest(CREATE_SNAPSHOT_PERSON, createSnapshotPerson))
  })
})

describe('createSnapshotPerson', () => {
  const id = '1'
  const doraPerson = {
    race_ethnicity: {
      hispanic_origin_code: 'N',
      unable_to_determine_code: '',
      race_codes: [{id: '1'}],
      hispanic_codes: [],
      hispanic_unable_to_determine_code: '',
    },
    client_county: {
      description: 'Nowhere',
      id: '999',
    },
    addresses: [{
      zip: '99999',
      city: 'Al Haad',
      type: {id: '1'},
      street_name: 'Canary Alley',
      state_name: 'California',
      street_number: '15',
      effective_start_date: '1997-09-04',
      id: 'NuzhtHm083',
      state: {id: '1828'},
      state_code: 'CA',
      zip_4: '1111',
    }],
    gender: 'male',
    languages: [{
      id: '2',
      primary: true,
    }, {
      id: '1',
      primary: false,
    }],
    date_of_birth: '1994-09-29',
    legacy_descriptor: {
      legacy_id: id,
    },
    last_name: 'John',
    middle_name: '',
    name_suffix: 'jr',
    ssn: '996005129',
    phone_numbers: [{number: '9660007290'}],
    id: id,
    first_name: 'Mohammed',
    sensitivity_indicator: 'N',
  }

  const participant = {
    date_of_birth: '1994-09-29',
    approximate_age: null,
    approximate_age_units: null,
    first_name:	'Mohammed',
    gender: 'male',
    middle_name: '',
    name_suffix: 'jr',
    last_name: 'John',
    ssn: '996005129',
    sealed: false,
    sensitive: false,
    phone_numbers: [{number: '9660007290'}],
    addresses: [{
      city: 'Al Haad',
      state: 'CA',
      street_address: '15 Canary Alley',
      zip: '99999',
      type: 'address type',
    }],
    id: id,
    legacy_id: id,
    roles: [],
    languages: ['French', 'English'],
    races: [{
      race: 'Race 1',
      race_detail: 'European',
    }],
    ethnicity: {
      hispanic_latino_origin: 'no',
      ethnicity_detail: [],
    },
  }
  const action = personCardActions.createSnapshotPerson(id)

  const languageLovs = [
    {code: '1', value: 'English'},
    {code: '2', value: 'French'},
    {code: '3', value: 'Italian'},
  ]
  const ethnicityTypeLovs = [
    {code: '1', value: 'European'},
    {code: '2', value: 'French'},
    {code: '3', value: 'Romanian'},
  ]
  const raceTypeLovs = [
    {code: '1', value: 'Race 1'},
    {code: '2', value: 'Race 2'},
    {code: '3', value: 'Race 3'},
  ]
  const unableToDetermineCodes = [
    {code: 'A', value: 'Abandoned'},
    {code: 'I', value: 'Unknown'},
    {code: 'K', value: 'Unknown'},
  ]
  const hispanicOriginCodes = [
    {code: 'Y', value: 'yes'},
    {code: 'N', value: 'no'},
  ]

  const addressTypes = [
    {code: '1', value: 'address type'},
  ]

  const state = fromJS({
    languages: languageLovs,
    ethnicityTypes: ethnicityTypeLovs,
    raceTypes: raceTypeLovs,
    unableToDetermineCodes,
    hispanicOriginCodes,
    addressTypes,
  })

  it('fetches participant, relationships, and history', () => {
    const gen = createSnapshotPerson(action)
    expect(gen.next().value).toEqual(call(get, `/api/v1/people/${id}`))
    expect(gen.next(doraPerson).value).toEqual(select())
    expect(gen.next(state).value).toEqual(
      put(personCardActions.createPersonSuccess(participant))
    )
    expect(gen.next().value).toEqual(
      select(getClientIdsSelector)
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
