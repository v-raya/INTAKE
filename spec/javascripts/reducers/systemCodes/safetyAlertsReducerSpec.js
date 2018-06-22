import {List, fromJS} from 'immutable'
import * as matchers from 'jasmine-immutable-matchers'
import safetyAlertsReducer from 'reducers/systemCodes/safetyAlertsReducer'
import {fetchSuccess, fetchFailure} from 'actions/systemCodesActions'

describe('safetyAlertsReducer', () => {
  beforeEach(() => jasmine.addMatchers(matchers))

  describe('on FETCH_SYSTEM_CODES_COMPLETE', () => {
    it('returns safety alerts', () => {
      const action = fetchSuccess([
        {code: '1', value: 'A', category: 'safety_alert'},
        {code: '2', value: 'A', category: 'us_state'},
        {code: '3', value: 'B', category: 'safety_alert'},
        {code: '3', value: 'C', category: 'counties'},
      ])
      expect(safetyAlertsReducer(List(), action)).toEqualImmutable(fromJS([
        {code: '1', value: 'A', category: 'safety_alert'},
        {code: '3', value: 'B', category: 'safety_alert'},
      ]))
    })
    it('returns the alerts sorted in numeric code order', () => {
      const action = fetchSuccess([
        {code: '100', value: 'A', category: 'safety_alert'},
        {code: '3', value: 'B', category: 'safety_alert'},
        {code: '4', value: 'C', category: 'safety_alert'},
        {code: '2', value: 'D', category: 'safety_alert'},
      ])
      expect(safetyAlertsReducer(List(), action)).toEqualImmutable(fromJS([
        {code: '2', value: 'D', category: 'safety_alert'},
        {code: '3', value: 'B', category: 'safety_alert'},
        {code: '4', value: 'C', category: 'safety_alert'},
        {code: '100', value: 'A', category: 'safety_alert'},
      ]))
    })
    it('returns the last state on failure', () => {
      const action = fetchFailure()
      expect(safetyAlertsReducer(List(), action)).toEqualImmutable(List())
    })
  })
})
