import 'babel-polyfill'
import {takeEvery, put, select} from 'redux-saga/effects'
import {
  deleteSnapshotPersonSaga,
  deleteSnapshotPerson,
} from 'sagas/deleteSnapshotPersonSaga'
import {DELETE_SNAPSHOT_PERSON} from 'actions/personCardActions'
import * as personCardActions from 'actions/personCardActions'
import {fetchRelationshipsByClientIds} from 'actions/relationshipsActions'
import {fetchHistoryOfInvolvementsByClientIds} from 'actions/historyOfInvolvementActions'
import {getClientIdsSelector} from 'selectors/clientSelectors'

describe('deleteParticipantSaga', () => {
  it('deletes participant on DELETE_PERSON', () => {
    const gen = deleteSnapshotPersonSaga()
    expect(gen.next().value).toEqual(takeEvery(DELETE_SNAPSHOT_PERSON, deleteSnapshotPerson))
  })
})

describe('deleteParticipant', () => {
  const id = '123'
  const action = personCardActions.deleteSnapshotPerson(id)

  it('fetches relationships and history_of_involvements', () => {
    const gen = deleteSnapshotPerson(action)
    expect(gen.next().value).toEqual(
      put(personCardActions.deletePersonSuccess(id))
    )
    expect(gen.next().value).toEqual(
      select(getClientIdsSelector)
    )
    const clientIds = ['456', '789']
    expect(gen.next(clientIds).value).toEqual(
      put(fetchRelationshipsByClientIds(clientIds))
    )
    expect(gen.next().value).toEqual(
      put(fetchHistoryOfInvolvementsByClientIds(clientIds))
    )
  })
})
