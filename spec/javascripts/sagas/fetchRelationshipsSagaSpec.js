import 'babel-polyfill'
import {takeLatest, put, call} from 'redux-saga/effects'
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
      takeLatest(FETCH_RELATIONSHIPS, fetchRelationships)
    )
  })
})

describe('fetchRelationships', () => {
  const ids = ['a', 'b', 'c']
  const action = actions.fetchRelationships(ids)

  it('should fetch and put relationships', () => {
    const gen = fetchRelationships(action)

    expect(gen.next().value).toEqual(
      call(get, '/api/v1/relationships?clientIds=a,b,c&screeningId=a,b,c')
    )

    const relationships = [{id: 'a'}, {id: 'b'}, {id: 'c'}]
    expect(gen.next(relationships).value).toEqual(
      put(actions.fetchRelationshipsSuccess(relationships))
    )
  })

  it('should put errors when errors are thrown', () => {
    const gen = fetchRelationships(action)
    expect(gen.next().value).toEqual(
      call(get, '/api/v1/relationships?clientIds=a,b,c&screeningId=a,b,c')
    )
    const error = {responseJSON: 'some error'}
    expect(gen.throw(error).value).toEqual(
      put(actions.fetchRelationshipsFailure('some error'))
    )
  })
})
