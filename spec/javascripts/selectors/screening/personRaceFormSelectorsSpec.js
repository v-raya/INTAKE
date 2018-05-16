import {fromJS} from 'immutable'
import {
  getPersonRacesSelector,
  getPersonRaceDetailsSelector,
  getIsRaceIndeterminateValueSelector,
} from 'selectors/screening/personRaceFormSelectors'
import * as matchers from 'jasmine-immutable-matchers'

describe('personRaceFormSelectors', () => {
  beforeEach(() => jasmine.addMatchers(matchers))
  describe('getPersonRacesSelector', () => {
    it('returns the races for the person with the passed id', () => {
      const peopleForm = {
        one: {
          races: {
            White: {value: true},
            Asian: {value: true},
          },
        },
        two: {
          races: {},
        },
      }
      const state = fromJS({peopleForm})
      expect(getPersonRacesSelector(state, 'one')).toEqualImmutable(fromJS({
        White: true,
        'Black or African American': false,
        Asian: true,
        'American Indian or Alaska Native': false,
        'Native Hawaiian or Other Pacific Islander': false,
        Unknown: false,
        Abandoned: false,
        'Declined to answer': false,
      }))
    })
  })
  describe('getPersonRaceDetailsSelector', () => {
    it('returns the races for the person with the passed id', () => {
      const peopleForm = {
        one: {
          race_details: {
            White: {value: 'race_detail_1'},
            Asian: {value: 'race_detail_2'},
          },
        },
        two: {
          race_details: {},
        },
      }
      const state = fromJS({peopleForm})
      expect(getPersonRaceDetailsSelector(state, 'one')).toEqualImmutable(fromJS({
        White: 'race_detail_1',
        'Black or African American': '',
        Asian: 'race_detail_2',
        'American Indian or Alaska Native': '',
        'Native Hawaiian or Other Pacific Islander': '',
        Unknown: '',
        Abandoned: '',
        'Declined to answer': '',
      }))
    })
  })

  describe('getIsRaceIndeterminateValueSelector', () => {
    it('returns true if persons race is Unknown', () => {
      const peopleForm = {
        one: {
          races: {
            Unknown: {value: true},
          },
        },
        two: {
          races: {},
        },
      }
      const state = fromJS({peopleForm})
      expect(getIsRaceIndeterminateValueSelector(state, 'one')).toEqual(true)
      expect(getIsRaceIndeterminateValueSelector(state, 'two')).toEqual(false)
    })

    it('returns true if persons race is Abandoned', () => {
      const peopleForm = {
        one: {
          races: {
            Abandoned: {value: true},
          },
        },
        two: {
          races: {
            White: {value: true},
          },
        },
      }
      const state = fromJS({peopleForm})
      expect(getIsRaceIndeterminateValueSelector(state, 'one')).toEqual(true)
      expect(getIsRaceIndeterminateValueSelector(state, 'two')).toEqual(false)
    })

    it("returns true if persons race is 'Declined to answer'", () => {
      const peopleForm = {
        one: {
          races: {
            'Declined to answer': {value: true},
          },
        },
        two: {
          Asian: {value: true},
        },
      }
      const state = fromJS({peopleForm})
      expect(getIsRaceIndeterminateValueSelector(state, 'one')).toEqual(true)
      expect(getIsRaceIndeterminateValueSelector(state, 'two')).toEqual(false)
    })
  })
})
