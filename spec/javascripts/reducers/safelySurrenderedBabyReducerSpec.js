import {Map} from 'immutable'
import * as matchers from 'jasmine-immutable-matchers'
import {
  fetchSSBSuccess,
  fetchSSBFailure,
  saveField,
} from 'actions/safelySurrenderedBabyActions'
import safelySurrenderedBabyReducer from 'reducers/safelySurrenderedBabyReducer'

describe('safelySurrenderedBabyReducer', () => {
  beforeEach(() => jasmine.addMatchers(matchers))

  describe('on FETCH_SSB_COMPLETE', () => {
    it('updates the participant child', () => {
      const action = fetchSSBSuccess({participant_child_id: '123'})
      expect(safelySurrenderedBabyReducer(Map(), action)).toEqualImmutable(
        Map().set('participant_child_id', '123')
      )
    })

    it('returns the last state on failure', () => {
      const action = fetchSSBFailure('Bad')
      expect(safelySurrenderedBabyReducer(Map(), action)).toEqualImmutable(Map())
    })
  })

  describe('on SAVE_SSB_FIELD', () => {
    const initial = Map({
      participant_child_id: '123',
      persisted: Map(),
      form: Map(),
    })

    it('updates the surrenderedBy field', () => {
      const action = saveField('surrenderedBy', 'Somebody')
      expect(safelySurrenderedBabyReducer(initial, action)).toEqualImmutable(
        initial.setIn(['form', 'surrenderedBy'], 'Somebody')
      )
    })
    it('updates the relationToChild field', () => {
      const action = saveField('relationToChild', 'New Relation')
      expect(safelySurrenderedBabyReducer(initial, action)).toEqualImmutable(
        initial.setIn(['form', 'relationToChild'], 'New Relation')
      )
    })
    it('updates the braceletId field', () => {
      const action = saveField('braceletId', 'New Bracelet')
      expect(safelySurrenderedBabyReducer(initial, action)).toEqualImmutable(
        initial.setIn(['form', 'braceletId'], 'New Bracelet')
      )
    })
    it('updates the comment field', () => {
      const action = saveField('comments', 'New Comment')
      expect(safelySurrenderedBabyReducer(initial, action)).toEqualImmutable(
        initial.setIn(['form', 'comments'], 'New Comment')
      )
    })
    it('updates the parentGuardGivenBraceletId field', () => {
      const action = saveField('parentGuardGivenBraceletId', 'Yes')
      expect(safelySurrenderedBabyReducer(initial, action)).toEqualImmutable(
        initial.setIn(['form', 'parentGuardGivenBraceletId'], 'Yes')
      )
    })
    it('updates the parentGuardProvMedicalQuestionaire field', () => {
      const action = saveField('parentGuardProvMedicalQuestionaire', 'Yes')
      expect(safelySurrenderedBabyReducer(initial, action)).toEqualImmutable(
        initial.setIn(['form', 'parentGuardProvMedicalQuestionaire'], 'Yes')
      )
    })
    it('updates the medQuestionaireReturnDate field', () => {
      const action = saveField('medQuestionaireReturnDate', '2018-05-01')
      expect(safelySurrenderedBabyReducer(initial, action)).toEqualImmutable(
        initial.setIn(['form', 'medQuestionaireReturnDate'], '2018-05-01')
      )
    })
  })
})
