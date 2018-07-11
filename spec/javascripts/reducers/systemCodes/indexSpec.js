import {fromJS} from 'immutable'
import * as matchers from 'jasmine-immutable-matchers'
import systemCodesReducer from 'reducers/systemCodes'

describe('systemCodesReducer', () => {
  beforeEach(() => jasmine.addMatchers(matchers))

  const initialState = fromJS({
    addressCounties: [],
    addressTypes: [],
    allegationTypes: [],
    communicationMethods: [],
    counties: [],
    countyAgencies: [],
    csecTypes: [],
    ethnicityTypes: [],
    hispanicOriginCodes: [],
    languages: [],
    locations: [],
    raceTypes: [],
    relationshipTypes: [],
    screenResponseTimes: [],
    unableToDetermineCodes: [],
    usStates: [],
  })

  it('has an initial state of empty systemCode lists', () => {
    expect(systemCodesReducer(undefined, {type: 'ANY'})).toEqualImmutable(initialState)
  })
})
