import {List, fromJS} from 'immutable'
import * as matchers from 'jasmine-immutable-matchers'
import systemCodesReducerFactory from 'reducers/systemCodes/systemCodesReducerFactory'
import {fetchSuccess, fetchFailure} from 'actions/systemCodesActions'

describe('systemCodesReducerFactory', () => {
  const WIDGET = 'widget'
  const DOODAD = 'doodad'
  let widgetReducer
  let doodadReducer

  beforeEach(() => {
    jasmine.addMatchers(matchers)
    widgetReducer = systemCodesReducerFactory(WIDGET)
    doodadReducer = systemCodesReducerFactory(DOODAD)
  })

  describe('on FETCH_SYSTEM_CODES_COMPLETE', () => {
    it('returns the codes from its category', () => {
      const action = fetchSuccess([
        {code: '1', value: 'A', category: WIDGET},
        {code: '2', value: 'A', category: DOODAD},
        {code: '3', value: 'B', category: WIDGET},
        {code: '3', value: 'C', category: DOODAD},
      ])
      expect(widgetReducer(List(), action)).toEqualImmutable(fromJS([
        {code: '1', value: 'A', category: WIDGET},
        {code: '3', value: 'B', category: WIDGET},
      ]))
      expect(doodadReducer(List(), action)).toEqualImmutable(fromJS([
        {code: '2', value: 'A', category: DOODAD},
        {code: '3', value: 'C', category: DOODAD},
      ]))
    })
    it('returns the alerts in the same sorted order as received', () => {
      const action = fetchSuccess([
        {code: '100', value: 'A', category: WIDGET},
        {code: '3', value: 'B', category: WIDGET},
        {code: '4', value: 'C', category: WIDGET},
        {code: '2', value: 'D', category: WIDGET},
      ])
      expect(widgetReducer(List(), action)).toEqualImmutable(fromJS([
        {code: '100', value: 'A', category: WIDGET},
        {code: '3', value: 'B', category: WIDGET},
        {code: '4', value: 'C', category: WIDGET},
        {code: '2', value: 'D', category: WIDGET},
      ]))
    })
    it('returns the last state on failure', () => {
      const action = fetchFailure()
      expect(widgetReducer(List(), action)).toEqualImmutable(List())
      expect(doodadReducer(List(), action)).toEqualImmutable(List())
    })
  })
})
