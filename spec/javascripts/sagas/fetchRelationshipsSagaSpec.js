import 'babel-polyfill'
import {takeEvery, put, call} from 'redux-saga/effects'
import {get} from 'utils/http'
import {
  fetchRelationshipsSaga,
  fetchRelationships,
} from 'sagas/fetchRelationshipsSaga'
import {FETCH_RELATIONSHIPS} from 'actions/actionTypes'
import * as actions from 'actions/relationshipsActions'

describe('fetchRelationshipsSaga', () => {
  it('fetches relationships on FETCH_RELATIONSHIPS', () => {
    const gen = fetchRelationshipsSaga()
    expect(gen.next().value).toEqual(
      takeEvery(FETCH_RELATIONSHIPS, fetchRelationships)
    )
  })
})

describe('fetchRelationships', () => {
  const id = '123'
  const type = 'bananas'
  const action = actions.fetchRelationships(type, id)

  it('should fetch and put relationships', () => {
    const gen = fetchRelationships(action)
    expect(gen.next().value).toEqual(
      call(get, '/api/v1/bananas/123/relationships')
    )
    const relationships = [{id: '2'}]
    expect(gen.next(relationships).value).toEqual(
      put(actions.fetchRelationshipsSuccess(relationships))
    )
  })

  it('should put errors when errors are thrown', () => {
    const gen = fetchRelationships(action)
    expect(gen.next().value).toEqual(
      call(get, '/api/v1/bananas/123/relationships')
    )
    const error = {responseJSON: 'some error'}
    expect(gen.throw(error).value).toEqual(
      put(actions.fetchRelationshipsFailure('some error'))
    )
  })

  it('should fetch by client_ids when provided', () => {
    const gen = fetchRelationships(
      actions.fetchRelationshipsByClientIds(['a', 'b', 'c']))

    expect(gen.next().value).toEqual(
      call(get, '/api/v1/relationships?clientIds=a,b,c')
    )

    const relationships = [{id: 'a'}, {id: 'b'}, {id: 'c'}]
    expect(gen.next(relationships).value).toEqual(
      put(actions.fetchRelationshipsSuccess(relationships))
    )
  })
})
