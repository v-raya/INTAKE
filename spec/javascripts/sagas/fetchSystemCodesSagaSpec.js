import 'babel-polyfill'
import {takeEvery, put} from 'redux-saga/effects'
import {fetchSystemCodesSaga, fetchSystemCodes} from 'sagas/fetchSystemCodesSaga'
import {FETCH_SYSTEM_CODES, fetchSuccess} from 'actions/systemCodesActions'
import LOV from 'data/lov/lov'

describe('fetchSystemCodesSaga', () => {
  it('fetches system codes on FETCH_SYSTEM_CODES', () => {
    const gen = fetchSystemCodesSaga()
    expect(gen.next().value).toEqual(takeEvery(FETCH_SYSTEM_CODES, fetchSystemCodes))
  })
})

describe('fetchSystemCodes', () => {
  it('fetches and puts system codes', () => {
    const gen = fetchSystemCodes()
    expect(gen.next().value).toEqual(put(fetchSuccess(LOV)))
  })
})
