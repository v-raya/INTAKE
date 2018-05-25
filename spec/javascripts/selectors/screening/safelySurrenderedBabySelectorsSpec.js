import {fromJS, Map} from 'immutable'
import * as matchers from 'jasmine-immutable-matchers'
import {
  getPersistedSafelySurrenderedBaby,
  getFormSafelySurrenderedBaby,
} from 'selectors/screening/safelySurrenderedBabySelectors'

describe('safelySurrenderedBabySelectors', () => {
  beforeEach(() => jasmine.addMatchers(matchers))

  const state = fromJS({
    safelySurrenderedBaby: {
      persisted: {
        participantChildId: '123',
        relationToChild: '1592',
        parentGuardGivenBraceletId: 'yes',
        parentGuardProvMedicalQuestionaire: 'declined',
      },
      form: {
        participantChildId: '123',
        relationToChild: '1600',
        parentGuardGivenBraceletId: 'unknown',
        parentGuardProvMedicalQuestionaire: 'unknown',
      },
    },
  })

  describe('getFormSafelySurrenderedBaby', () => {
    it('returns SSB info for the matching child', () => {
      expect(getFormSafelySurrenderedBaby(state, '123')).toEqualImmutable(
        fromJS({
          participantChildId: '123',
          relationToChild: '1600',
          parentGuardGivenBraceletId: 'unknown',
          parentGuardProvMedicalQuestionaire: 'unknown',
        })
      )
    })

    it('returns undefined for people who are not SSBs', () => {
      expect(getFormSafelySurrenderedBaby(state, '456')).toEqual(null)
    })

    it('returns undefined when there is no SSB information', () => {
      expect(getFormSafelySurrenderedBaby(Map({
        safelySurrenderedBaby: null,
      }), '123')).toEqual(null)
    })
  })

  describe('getPersistedSafelySurrenderedBaby', () => {
    it('returns SSB info for the matching child', () => {
      expect(getPersistedSafelySurrenderedBaby(state, '123')).toEqualImmutable(
        fromJS({
          participantChildId: '123',
          relationToChild: 'Parents',
          parentGuardGivenBraceletId: 'Yes',
          parentGuardProvMedicalQuestionaire: 'Declined',
        })
      )
    })

    it('returns undefined for people who are not SSBs', () => {
      expect(getPersistedSafelySurrenderedBaby(state, '456')).toEqual(null)
    })

    it('returns undefined when there is no SSB information', () => {
      expect(getPersistedSafelySurrenderedBaby(Map({
        safelySurrenderedBaby: null,
      }), '123')).toEqual(null)
    })
  })
})
