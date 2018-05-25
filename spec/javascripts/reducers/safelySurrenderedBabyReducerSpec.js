import {Map} from 'immutable'
import * as matchers from 'jasmine-immutable-matchers'
import {
  fetchSSBSuccess,
  fetchSSBFailure,
  saveSSBSuccess,
  saveSSBFailure,
  setField,
} from 'actions/safelySurrenderedBabyActions'
import {setField as setPersonField} from 'actions/peopleFormActions'
import safelySurrenderedBabyReducer from 'reducers/safelySurrenderedBabyReducer'

describe('safelySurrenderedBabyReducer', () => {
  beforeEach(() => jasmine.addMatchers(matchers))

  describe('on FETCH_SSB_COMPLETE', () => {
    it('updates the participant child', () => {
      const action = fetchSSBSuccess({participant_child_id: '123'})
      expect(safelySurrenderedBabyReducer(Map(), action)).toEqualImmutable(
        Map()
          .setIn(['persisted', 'participantChildId'], '123')
          .setIn(['form', 'participantChildId'], '123')
      )
    })

    it('returns the last state on failure', () => {
      const action = fetchSSBFailure('Bad')
      expect(safelySurrenderedBabyReducer(Map(), action)).toEqualImmutable(Map())
    })
  })

  describe('on SAVE_SSB_COMPLETE', () => {
    it('returns the last state on failure', () => {
      const action = saveSSBFailure('Bad')
      expect(safelySurrenderedBabyReducer(Map(), action)).toEqualImmutable(Map())
    })

    it('copies the payload to both persisted and form state', () => {
      const payload = {
        relationToChild: '1592',
        braceletId: 'Lightning',
        parentGuardGivenBraceletId: 'unknown',
        parentGuardProvMedicalQuestionaire: 'unknown',
        comments: 'Yer a wizard, Harry!',
        medQuestionaireReturnDate: '2001-11-14',
      }
      const immutablePayload = Map(payload)
      const action = saveSSBSuccess(payload)

      expect(safelySurrenderedBabyReducer(Map(), action)).toEqualImmutable(Map({
        persisted: immutablePayload,
        form: immutablePayload,
      }))
    })
  })

  describe('on SET_SSB_FIELD', () => {
    const initial = Map({
      persisted: Map(),
      form: Map(),
    })

    it('updates the surrenderedBy field', () => {
      const action = setField('surrenderedBy', 'Somebody')
      expect(safelySurrenderedBabyReducer(initial, action)).toEqualImmutable(
        initial.setIn(['form', 'surrenderedBy'], 'Somebody')
      )
    })
    it('updates the relationToChild field', () => {
      const action = setField('relationToChild', 'New Relation')
      expect(safelySurrenderedBabyReducer(initial, action)).toEqualImmutable(
        initial.setIn(['form', 'relationToChild'], 'New Relation')
      )
    })
    it('updates the braceletId field', () => {
      const action = setField('braceletId', 'New Bracelet')
      expect(safelySurrenderedBabyReducer(initial, action)).toEqualImmutable(
        initial.setIn(['form', 'braceletId'], 'New Bracelet')
      )
    })
    it('updates the comment field', () => {
      const action = setField('comments', 'New Comment')
      expect(safelySurrenderedBabyReducer(initial, action)).toEqualImmutable(
        initial.setIn(['form', 'comments'], 'New Comment')
      )
    })
    it('updates the parentGuardGivenBraceletId field', () => {
      const action = setField('parentGuardGivenBraceletId', 'Yes')
      expect(safelySurrenderedBabyReducer(initial, action)).toEqualImmutable(
        initial.setIn(['form', 'parentGuardGivenBraceletId'], 'Yes')
      )
    })
    it('updates the parentGuardProvMedicalQuestionaire field', () => {
      const action = setField('parentGuardProvMedicalQuestionaire', 'Yes')
      expect(safelySurrenderedBabyReducer(initial, action)).toEqualImmutable(
        initial.setIn(['form', 'parentGuardProvMedicalQuestionaire'], 'Yes')
      )
    })
    it('updates the medQuestionaireReturnDate field', () => {
      const action = setField('medQuestionaireReturnDate', '2018-05-01')
      expect(safelySurrenderedBabyReducer(initial, action)).toEqualImmutable(
        initial.setIn(['form', 'medQuestionaireReturnDate'], '2018-05-01')
      )
    })
  })

  describe('on SET_PEOPLE_FORM_FIELD', () => {
    it('ignores fields that are not roles', () => {
      const action = setPersonField('123', ['ssn'], '12345')
      expect(safelySurrenderedBabyReducer(Map(), action)).toEqualImmutable(Map())
    })

    it('ignores changes to role that do not have victim', () => {
      const action = setPersonField('123', ['roles'], ['Perpetrator'])
      expect(safelySurrenderedBabyReducer(Map(), action)).toEqualImmutable(Map())
    })

    it('ignores new victims if a participant child is already set', () => {
      const state = Map({
        persisted: Map().set('participantChildId', '456'),
        form: Map().set('participantChildId', '456'),
      })
      const action = setPersonField('123', ['roles'], ['Victim'])
      expect(safelySurrenderedBabyReducer(state, action)).toEqualImmutable(state)
    })

    it('watches for the addition of victims', () => {
      const action = setPersonField('123', ['roles'], ['Victim'])
      expect(safelySurrenderedBabyReducer(Map(), action)).toEqualImmutable(Map({
        form: Map().set('participantChildId', '123'),
      }))
    })
  })
})
