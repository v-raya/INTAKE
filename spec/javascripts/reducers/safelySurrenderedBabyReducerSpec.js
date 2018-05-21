import {Map} from 'immutable'
import * as matchers from 'jasmine-immutable-matchers'
import safelySurrenderedBabyReducer from 'reducers/safelySurrenderedBabyReducer'

describe('safelySurrenderedBabyReducer', () => {
  beforeEach(() => jasmine.addMatchers(matchers))

  describe('on FETCH_SSB_COMPLETE', () => {
    it('updates the participant child', () => {
      const action = {type: 'FETCH_SSB_COMPLETE', payload: {participant_child_id: '123'}}
      expect(safelySurrenderedBabyReducer(Map(), action)).toEqualImmutable(
        Map().set('participant_child_id', '123')
      )
    })

    it('returns the last state on failure', () => {
      const action = {type: 'FETCH_SSB_COMPLETE', payload: null, error: 'Bad'}
      expect(safelySurrenderedBabyReducer(Map(), action)).toEqualImmutable(Map())
    })
  })
})
