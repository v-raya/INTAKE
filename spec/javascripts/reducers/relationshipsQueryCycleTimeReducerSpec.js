import * as matchers from 'jasmine-immutable-matchers'
import relationshipsQueryCycleTimeReducer from 'reducers/relationshipsQueryCycleTimeReducer'
import {fromJS, List} from 'immutable'
import {clearTime} from 'actions/personCardActions'

describe('relationshipsQueryCycleTimeReducer', () => {
  beforeEach(() => jasmine.addMatchers(matchers))
  describe('on CLEAR_TIME', () => {
    it('clear person created at time', () => {
      const oldState = fromJS([])
      const action = clearTime()
      expect(relationshipsQueryCycleTimeReducer(oldState, action)).toEqual(List())
    })
  })
})
