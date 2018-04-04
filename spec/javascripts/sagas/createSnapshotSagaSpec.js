import 'babel-polyfill'
import {takeEvery, put} from 'redux-saga/effects'
import {
  createSnapshotSaga,
  createSnapshot,
} from 'sagas/createSnapshotSaga'
import {CREATE_SNAPSHOT} from 'actions/actionTypes'
import {
  createSnapshotSuccess,
} from 'actions/snapshotActions'
import {push} from 'react-router-redux'

describe('createSnapshotSaga', () => {
  it('creates snapshot on CREATE_SNAPSHOT', () => {
    const gen = createSnapshotSaga()
    expect(gen.next().value).toEqual(takeEvery(CREATE_SNAPSHOT, createSnapshot))
  })
})

describe('createSnapshot', () => {
  it('creates and puts snapshot', () => {
    const gen = createSnapshot()
    expect(gen.next().value).toEqual(
      put(createSnapshotSuccess())
    )
    expect(gen.next().value).toEqual(
      put(push('/snapshot'))
    )
  })
})
