import 'babel-polyfill'
import {takeEvery, put, select, call} from 'redux-saga/effects'
import {
  createScreeningSaga,
  createScreening,
} from 'sagas/createScreeningSaga'
import {CREATE_SCREENING} from 'actions/actionTypes'
import {push} from 'react-router-redux'
import {getStaffIdSelector} from 'selectors/userInfoSelectors'
import {logEvent} from 'utils/analytics'

describe('createScreeningSaga', () => {
  it('creates screening on CREATE_SCREENING', () => {
    const gen = createScreeningSaga()
    expect(gen.next().value).toEqual(takeEvery(CREATE_SCREENING, createScreening))
  })
})

describe('createScreening', () => {
  it('screening new and log device type', () => {
    const gen = createScreening()
    const staffId = '0X5'

    expect(gen.next().value).toEqual(
      put(push('/screenings/new'))
    )
    expect(gen.next().value).toEqual(
      select(getStaffIdSelector)
    )
    expect(gen.next(staffId).value).toEqual(call(logEvent, 'StartScreening', {
      staffId: staffId,
    }))
  })
})
