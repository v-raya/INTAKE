import 'babel-polyfill'
import {call, put, select, takeEvery} from 'redux-saga/effects'
import {fetchRelationships} from 'actions/relationshipsActions'
import {fromJS} from 'immutable'
import {selectRelationship} from 'selectors/screening/relationshipFormSelectors'
import {getScreeningIdValueSelector} from 'selectors/screeningSelectors'
import {saveRelationshipSaga, saveRelationship} from 'sagas/saveRelationshipSaga'
import {selectClientIds} from 'selectors/participantSelectors'
import {UPDATE_RELATIONSHIP} from 'actions/actionTypes'
import {updateRelationshipFailure, updateRelationshipSuccess} from 'actions/relationshipActions'
import * as relationshipAction from 'actions/relationshipActions'
import * as Utils from 'utils/http'

describe('saveRelationshipSaga', () => {
  it('updates relationship on UPDATE_RELATIONSHIP', () => {
    const gen = saveRelationshipSaga()

    expect(gen.next().value).toEqual(takeEvery(UPDATE_RELATIONSHIP, saveRelationship))
  })
})

describe('updateRelationship', () => {
  const relationship = {
    id: '12345',
    client_id: 'ZXY123',
    relative_id: 'ABC987',
    relationship_type: 190,
    absent_parent_indicator: true,
    same_home_tatus: 'Y',
    reversed: false,
    start_date: '1999-10-01',
    end_date: '2010-10-01',
    legacy_id: 'A1b2x',
  }

  const reversedRelationship = {
    id: '12345',
    client_id: 'ABC987',
    relative_id: 'ZXY123',
    relationship_type: 205,
    absent_parent_indicator: true,
    same_home_tatus: 'Y',
    reversed: true,
    start_date: '1999-10-01',
    end_date: '2010-10-01',
    legacy_id: 'A1b2x',
  }
  const action = relationshipAction.updateRelationship(relationship.id)

  it('updates relationship and fetches relationships when reversed is false', () => {
    const clientIds = ['123', '456']
    const screeningId = '1'
    const gen = saveRelationship(action)

    expect(gen.next().value).toEqual(
      select(selectRelationship)
    )
    expect(gen.next(fromJS(relationship)).value).toEqual(
      call(Utils.put, `/api/v1/relationships/${relationship.id}`, relationship)
    )
    expect(gen.next(relationship).value).toEqual(
      put(updateRelationshipSuccess(relationship))
    )
    expect(gen.next().value).toEqual(
      select(getScreeningIdValueSelector)
    )
    expect(gen.next(screeningId).value).toEqual(
      select(selectClientIds)
    )
    expect(gen.next(clientIds).value).toEqual(
      put(fetchRelationships(clientIds, screeningId))
    )
  })

  it('puts errors when errors are thrown when reversed is false', () => {
    const gen = saveRelationship(action)

    expect(gen.next().value).toEqual(
      select(selectRelationship)
    )
    expect(gen.next(fromJS(relationship)).value).toEqual(
      call(Utils.put, `/api/v1/relationships/${relationship.id}`, relationship)
    )
    const error = {responseJSON: 'some error'}
    expect(gen.throw(error).value).toEqual(
      put(updateRelationshipFailure(error))
    )
  })

  it('updates relationship and fetches relationships when reversed is true', () => {
    const clientIds = ['123', '456']
    const screeningId = '1'
    const gen = saveRelationship(action)

    expect(gen.next().value).toEqual(
      select(selectRelationship)
    )
    expect(gen.next(fromJS(reversedRelationship)).value).toEqual(
      call(Utils.put, `/api/v1/relationships/${reversedRelationship.id}`, reversedRelationship)
    )
    expect(gen.next(reversedRelationship).value).toEqual(
      put(updateRelationshipSuccess(reversedRelationship))
    )
    expect(gen.next().value).toEqual(
      select(getScreeningIdValueSelector)
    )
    expect(gen.next(screeningId).value).toEqual(
      select(selectClientIds)
    )
    expect(gen.next(clientIds).value).toEqual(
      put(fetchRelationships(clientIds, screeningId))
    )
  })

  it('puts errors when errors are thrown when reversed is true', () => {
    const gen = saveRelationship(action)

    expect(gen.next().value).toEqual(
      select(selectRelationship)
    )
    expect(gen.next(fromJS(reversedRelationship)).value).toEqual(
      call(Utils.put, `/api/v1/relationships/${reversedRelationship.id}`, reversedRelationship)
    )
    const error = {responseJSON: 'some error'}
    expect(gen.throw(error).value).toEqual(
      put(updateRelationshipFailure(error))
    )
  })
})
