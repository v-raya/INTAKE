import {fromJS, Map} from 'immutable'
import * as matchers from 'jasmine-immutable-matchers'
import {getSafelySurrenderedBaby} from 'selectors/screening/safelySurrenderedBabySelectors'

describe('safelySurrenderedBabySelectors', () => {
  beforeEach(() => jasmine.addMatchers(matchers))

  describe('getSafelySurrenderedBaby', () => {
    const state = fromJS({
      safelySurrenderedBaby: {
        participant_child_id: '123',
      },
    })

    it('returns SSB info for the matching child', () => {
      expect(getSafelySurrenderedBaby(state, '123')).toEqualImmutable(
        fromJS({
          participant_child_id: '123',
        })
      )
    })

    it('returns undefined for people who are not SSBs', () => {
      expect(getSafelySurrenderedBaby(state, '456')).toEqual(undefined)
    })

    it('returns undefined when there is no SSB information', () => {
      expect(getSafelySurrenderedBaby(Map({
        safelySurrenderedBaby: null,
      }), '123')).toEqual(undefined)
    })
  })
})
