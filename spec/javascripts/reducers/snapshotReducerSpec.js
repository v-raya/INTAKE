import * as matchers from 'jasmine-immutable-matchers'
import {
  clearSnapshot,
} from 'actions/snapshotActions'
import snapshotReducer from 'reducers/snapshotReducer'
import {Map, fromJS} from 'immutable'

describe('snapshotReducer', () => {
  beforeEach(() => jasmine.addMatchers(matchers))

  describe('on CREATE_SNAPSHOT_COMPLETE', () => {
    it('clears all the snapshot data from the store', () => {
      const oldState = fromJS({id: 1})
      const action = clearSnapshot()
      expect(snapshotReducer(oldState, action)).toEqual(Map())
    })
  })

  describe('on CLEAR_SNAPSHOT', () => {
    it('clears all the snapshot data from the store', () => {
      const oldState = fromJS({id: 1})
      const action = clearSnapshot()
      expect(snapshotReducer(oldState, action)).toEqual(Map())
    })
  })
})
