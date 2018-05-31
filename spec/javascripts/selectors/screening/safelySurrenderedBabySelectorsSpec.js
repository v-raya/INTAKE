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
        parent_guardian_given_bracelet_id: 'Y',
        parent_guardian_provided_med_questionaire: 'D',
      },
      form: {
        surrendered_by: '5',
        participant_child: '123',
        relation_to_child: '1600',
        parent_guardian_given_bracelet_id: 'U',
        parent_guardian_provided_med_questionaire: 'U',
      },
    },
  })

  describe('getRawFormSafelySurrenderedBaby', () => {
    it('returns Maybe of SSB info for the matching child', () => {
      expect(getRawFormSafelySurrenderedBaby(state, '123').valueOrElse()).toEqualImmutable(
        fromJS({
          surrendered_by: '5',
          participant_child: '123',
          relation_to_child: '1600',
          parent_guardian_given_bracelet_id: 'U',
          parent_guardian_provided_med_questionaire: 'U',
        })
      )
    })

    it('returns Nothing for people who are not SSBs', () => {
      expect(getRawFormSafelySurrenderedBaby(state, '456').isNothing()).toEqual(true)
    })

    it('returns Nothing when there is no SSB information', () => {
      expect(getRawFormSafelySurrenderedBaby(Map({
        safelySurrenderedBaby: null,
      }), '123').isNothing()).toEqual(true)
    })
  })

  describe('getFormSafelySurrenderedBaby', () => {
    it('returns Maybe of SSB info for the matching child', () => {
      expect(getFormSafelySurrenderedBaby(state, '123').valueOrElse()).toEqualImmutable(
        fromJS({
          surrendered_by: 'John Doe',
          participant_child: '123',
          relation_to_child: '1600',
          parent_guardian_given_bracelet_id: 'U',
          parent_guardian_provided_med_questionaire: 'U',
        })
      )
    })

    it('returns Nothing for people who are not SSBs', () => {
      expect(getFormSafelySurrenderedBaby(state, '456').isNothing()).toEqual(true)
    })

    it('returns Nothing when there is no SSB information', () => {
      expect(getFormSafelySurrenderedBaby(Map({
        safelySurrenderedBaby: null,
      }), '123').isNothing()).toEqual(true)
    })
  })

  describe('getPersistedSafelySurrenderedBaby', () => {
    it('returns Maybe of SSB info for the matching child', () => {
      expect(getPersistedSafelySurrenderedBaby(state, '123').valueOrElse()).toEqualImmutable(
        fromJS({
          surrendered_by: 'John Doe',
          participant_child: '123',
          relation_to_child: 'Parents',
          parent_guardian_given_bracelet_id: 'Yes',
          parent_guardian_provided_med_questionaire: 'Declined',
        })
      )
    })

    it('returns Nothing for people who are not SSBs', () => {
      expect(getPersistedSafelySurrenderedBaby(state, '456').isNothing()).toEqual(true)
    })

    it('returns Nothing when there is no SSB information', () => {
      expect(getPersistedSafelySurrenderedBaby(Map({
        safelySurrenderedBaby: null,
      }), '123').isNothing()).toEqual(true)
    })
  })
})
