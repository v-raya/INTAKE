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
import {fetchRelationshipsByClientIds} from 'actions/relationshipsActions'
import {getClientIdsSelector} from 'selectors/clientSelectors'

describe('createSnapshotPersonSaga', () => {
  it('creates participant on CREATE_SNAPSHOT_PERSON', () => {
    const gen = createSnapshotPersonSaga()
    expect(gen.next().value).toEqual(takeEvery(CREATE_SNAPSHOT_PERSON, createSnapshotPerson))
  })
})

describe('createSnapshotPerson', () => {
  const id = '1'
  const legacy_descriptor = {legacy_id: id, legacy_table_name: 'table'}
  const params = {screening_id: '444', legacy_descriptor}
  const participant = {first_name: 'Michael', ...params}
  const action = personCardActions.createSnapshotPerson(id)

  it('fetches participant, relationships, and history', () => {
    const gen = createSnapshotPerson(action)
    expect(gen.next().value).toEqual(call(get, `/api/v1/participants/${id}`))
    expect(gen.next(participant).value).toEqual(
      put(personCardActions.createPersonSuccess(participant))
    )
    expect(gen.next().value).toEqual(
      select(getClientIdsSelector)
    )
    expect(gen.next(['1']).value).toEqual(
      put(fetchRelationshipsByClientIds(['1']))
    )
    expect(gen.next().value).toEqual(
      put(fetchHistoryOfInvolvementsByClientIds(['1']))
    )
  })

  it('puts errors when non-403 errors are thrown', () => {
    const gen = createSnapshotPerson(action)
    expect(gen.next().value).toEqual(call(get, `/api/v1/participants/${id}`))
    const error = {responseJSON: 'some error'}
    expect(gen.throw(error).value).toEqual(
      put(personCardActions.createPersonFailure('some error'))
    )
  })

  it('calls an alert when the error status is 403', () => {
    const gen = createSnapshotPerson(action)
    expect(gen.next().value).toEqual(call(get, `/api/v1/participants/${id}`))
    const error = {responseJSON: 'some error', status: 403}
    expect(gen.throw(error).value).toEqual(
      call(alert, 'You are not authorized to add this person.')
    )
  })
})
