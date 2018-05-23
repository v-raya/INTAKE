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

  describe('on SAVE_SSB_FIELD', () => {
    it('updates the surrenderedBy field', () => {
      const action = {type: 'SAVE_SSB_FIELD', payload: {field: 'surrenderedBy', value: 'Somebody'}}
      expect(safelySurrenderedBabyReducer(Map(), action)).toEqualImmutable(
        Map().set('surrenderedBy', 'Somebody')
      )
    })
    it('updates the relationToChild field', () => {
      const action = {type: 'SAVE_SSB_FIELD', payload: {field: 'relationToChild', value: 'New Relation'}}
      expect(safelySurrenderedBabyReducer(Map(), action)).toEqualImmutable(
        Map().set('relationToChild', 'New Relation')
      )
    })
    it('updates the braceletId field', () => {
      const action = {type: 'SAVE_SSB_FIELD', payload: {field: 'braceletId', value: 'New Bracelet'}}
      expect(safelySurrenderedBabyReducer(Map(), action)).toEqualImmutable(
        Map().set('braceletId', 'New Bracelet')
      )
    })
    it('updates the comment field', () => {
      const action = {type: 'SAVE_SSB_FIELD', payload: {field: 'comments', value: 'New Comment'}}
      expect(safelySurrenderedBabyReducer(Map(), action)).toEqualImmutable(
        Map().set('comments', 'New Comment')
      )
    })
    it('updates the parentGuardGivenBraceletId field', () => {
      const action = {type: 'SAVE_SSB_FIELD', payload: {field: 'parentGuardGivenBraceletId', value: 'Yes'}}
      expect(safelySurrenderedBabyReducer(Map(), action)).toEqualImmutable(
        Map().set('parentGuardGivenBraceletId', 'Yes')
      )
    })
    it('updates the parentGuardProvMedicalQuestionaire field', () => {
      const action = {type: 'SAVE_SSB_FIELD', payload: {field: 'parentGuardProvMedicalQuestionaire', value: 'Yes'}}
      expect(safelySurrenderedBabyReducer(Map(), action)).toEqualImmutable(
        Map().set('parentGuardProvMedicalQuestionaire', 'Yes')
      )
    })
    it('updates the medQuestionaireReturnDate field', () => {
      const action = {type: 'SAVE_SSB_FIELD', payload: {field: 'medQuestionaireReturnDate', value: '2018-05-01'}}
      expect(safelySurrenderedBabyReducer(Map(), action)).toEqualImmutable(
        Map().set('medQuestionaireReturnDate', '2018-05-01')
      )
    })
  })
})
