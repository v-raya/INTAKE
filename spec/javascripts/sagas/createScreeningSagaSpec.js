import 'babel-polyfill'
import {takeEvery, put} from 'redux-saga/effects'
import {
  createScreeningSaga,
  createScreening,
} from 'sagas/createScreeningSaga'
import {CREATE_SCREENING} from 'actions/actionTypes'
import {push} from 'react-router-redux'

describe('createScreeningSaga', () => {
  it('creates screening on CREATE_SCREENING', () => {
    const gen = createScreeningSaga()
    expect(gen.next().value).toEqual(takeEvery(CREATE_SCREENING, createScreening))
  })
})

describe('createScreening', () => {
  it('screening new', () => {
    const gen = createScreening()
    expect(gen.next().value).toEqual(
      put(push('/screenings/new'))
    )
  })
})
