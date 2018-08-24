import 'babel-polyfill'
import {
  BATCH_CREATE_RELATIONSHIPS,
  batchCreateRelationships,
  batchCreateRelationshipsFaliure,
  batchCreateRelationshipsSuccess,
} from 'actions/relationshipsActions'
import {call, put, select, takeEvery} from 'redux-saga/effects'
import {createRelationshipsSaga, createRelationships} from 'sagas/createRelationshipsSaga'
import {fetchRelationships} from 'actions/relationshipsActions'
import {getScreeningIdValueSelector} from 'selectors/screeningSelectors'
import {post} from 'utils/http'
import {selectClientIds} from 'selectors/participantSelectors'

describe('createRelationshipsSaga', () => {
  it('creates new relationships on BATCH_CREATE_RELATIONSHIPS', () => {
    const gen = createRelationshipsSaga()

    expect(gen.next().value).toEqual(takeEvery(BATCH_CREATE_RELATIONSHIPS, createRelationships))
  })
})

describe('createRelationships', () => {
  const relationships = [{
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
  }, {
    id: '808',
    client_id: '805',
    relative_id: '415',
    relationship_type: 191,
    absent_parent_indicator: true,
    same_home_tatus: 'Y',
    reversed: false,
    start_date: '1990-10-01',
    end_date: '2017-10-01',
    legacy_id: '650',
  }]
  const action = batchCreateRelationships(relationships)

  it('creates batch relationship and fetches relationships', () => {
    const clientIds = ['123', '456']
    const screeningId = '1'
    const gen = createRelationships(action)

    expect(gen.next().value).toEqual(
      call(post, '/api/v1/relationships', relationships)
    )
    expect(gen.next(relationships).value).toEqual(
      put(batchCreateRelationshipsSuccess(relationships))
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

  it('puts errors when errors are thrown', () => {
    const gen = createRelationships(action)

    expect(gen.next().value).toEqual(
      call(post, '/api/v1/relationships', relationships)
    )
    const error = {responseJSON: 'some error'}
    expect(gen.throw(error).value).toEqual(
      put(batchCreateRelationshipsFaliure(error))
    )
  })
})
