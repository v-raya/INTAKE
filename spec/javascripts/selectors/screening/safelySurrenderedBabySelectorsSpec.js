import {fromJS, Map} from 'immutable'
import * as matchers from 'jasmine-immutable-matchers'
import {
  getPersistedSafelySurrenderedBaby,
  getFormSafelySurrenderedBaby,
  getRawFormSafelySurrenderedBaby,
} from 'selectors/screening/safelySurrenderedBabySelectors'

describe('safelySurrenderedBabySelectors', () => {
  beforeEach(() => jasmine.addMatchers(matchers))

  const state = fromJS({
    participants: [
      {id: '5', first_name: 'John', last_name: 'Doe'},
      {id: '10', first_name: 'Jane', last_name: 'Doe'},
    ],
    safelySurrenderedBaby: {
      persisted: {
        surrendered_by: '5',
        participant_child: '123',
        relation_to_child: '1592',
        parent_guardian_given_bracelet_id: 'yes',
        parent_guardian_provided_med_questionaire: 'declined',
      },
      form: {
        surrendered_by: '5',
        participant_child: '123',
        relation_to_child: '1600',
        parent_guardian_given_bracelet_id: 'unknown',
        parent_guardian_provided_med_questionaire: 'unknown',
      },
    },
  })

  describe('getRawFormSafelySurrenderedBaby', () => {
    it('returns SSB info for the matching child', () => {
      expect(getRawFormSafelySurrenderedBaby(state, '123')).toEqualImmutable(
        fromJS({
          surrendered_by: '5',
          participant_child: '123',
          relation_to_child: '1600',
          parent_guardian_given_bracelet_id: 'unknown',
          parent_guardian_provided_med_questionaire: 'unknown',
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

  describe('getFormSafelySurrenderedBaby', () => {
    it('returns SSB info for the matching child', () => {
      expect(getFormSafelySurrenderedBaby(state, '123')).toEqualImmutable(
        fromJS({
          surrendered_by: 'John Doe',
          participant_child: '123',
          relation_to_child: '1600',
          parent_guardian_given_bracelet_id: 'unknown',
          parent_guardian_provided_med_questionaire: 'unknown',
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
          surrendered_by: 'John Doe',
          participant_child: '123',
          relation_to_child: 'Parents',
          parent_guardian_given_bracelet_id: 'Yes',
          parent_guardian_provided_med_questionaire: 'Declined',
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
