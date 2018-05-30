import {Map, fromJS} from 'immutable'
import * as matchers from 'jasmine-immutable-matchers'
import {setField} from 'actions/safelySurrenderedBabyActions'
import {setField as setPersonField} from 'actions/peopleFormActions'
import {
  createPersonSuccess,
  createPersonFailure,
  updatePersonSuccess,
  updatePersonFailure,
} from 'actions/personCardActions'
import {
  createScreeningSuccess,
  createScreeningFailure,
  fetchScreeningSuccess,
  fetchScreeningFailure,
  saveSuccess as saveScreeningSuccess,
  saveFailure as saveScreeningFailure,
} from 'actions/screeningActions'
import safelySurrenderedBabyReducer from 'reducers/safelySurrenderedBabyReducer'

describe('safelySurrenderedBabyReducer', () => {
  beforeEach(() => jasmine.addMatchers(matchers))

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
      const action = setPersonField('123', ['roles'], ['Mandated Reporter'])
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
      expect(safelySurrenderedBabyReducer(Map(), action)).toEqualImmutable(
        Map().setIn(['form', 'participantChildId'], '123')
      )
    })
  })

  describe('on UPDATE_PERSON_COMPLETE', () => {
    it('watches for new perpetrators', () => {
      const action = updatePersonSuccess({id: '3', roles: ['Perpetrator']})
      expect(safelySurrenderedBabyReducer(Map(), action)).toEqualImmutable(
        Map()
          .setIn(['form', 'surrenderedBy'], '3')
          .setIn(['persisted', 'surrenderedBy'], '3')
      )
    })

    it('ignores non-perpetrators', () => {
      const action = updatePersonSuccess({id: '3', roles: ['Victim']})
      expect(safelySurrenderedBabyReducer(Map(), action)).toEqualImmutable(Map())
    })

    it('copies SSB info from safely surrendered babies', () => {
      const payload = {
        participantChildId: '3',
        surrenderedBy: 'Unknown',
        relationToChild: '1592',
        braceletId: 'Lightning',
        parentGuardGivenBraceletId: 'unknown',
        parentGuardProvMedicalQuestionaire: 'unknown',
        comments: 'Yer a wizard, Harry!',
        medQuestionaireReturnDate: '2001-11-14',
      }
      const action = updatePersonSuccess({
        id: '3',
        roles: ['Victim'],
        safelySurrenderedBabies: payload,
      })
      expect(safelySurrenderedBabyReducer(Map(), action)).toEqualImmutable(Map({
        persisted: fromJS(payload),
        form: fromJS(payload),
      }))
    })

    it('ignores errors', () => {
      const action = updatePersonFailure('Bad')
      expect(safelySurrenderedBabyReducer(Map(), action)).toEqualImmutable(Map())
    })
  })

  describe('on CREATE_PERSON_COMPLETE', () => {
    it('returns previous state on error', () => {
      const action = createPersonFailure('Bad')
      expect(safelySurrenderedBabyReducer(Map(), action)).toEqualImmutable(Map())
    })

    it('copies SSB info from safely surrendered babies', () => {
      const payload = {
        participantChildId: '3',
        surrenderedBy: 'Unknown',
        relationToChild: '1592',
        braceletId: 'Lightning',
        parentGuardGivenBraceletId: 'unknown',
        parentGuardProvMedicalQuestionaire: 'unknown',
        comments: 'Yer a wizard, Harry!',
        medQuestionaireReturnDate: '2001-11-14',
      }
      const action = createPersonSuccess({
        id: '3',
        roles: ['Victim'],
        safelySurrenderedBabies: payload,
      })

      expect(safelySurrenderedBabyReducer(Map(), action)).toEqualImmutable(Map({
        persisted: fromJS(payload),
        form: fromJS(payload),
      }))
    })
  })

  describe('when reducing actions with multiple participants', () => {
    const payload = {
      participantChildId: '3',
      surrenderedBy: 'Unknown',
      relationToChild: '1592',
      braceletId: 'Lightning',
      parentGuardGivenBraceletId: 'unknown',
      parentGuardProvMedicalQuestionaire: 'unknown',
      comments: 'Yer a wizard, Harry!',
      medQuestionaireReturnDate: '2001-11-14',
    }
    const screening = {
      participants: [
        {id: '2'},
        {
          id: '3',
          safelySurrenderedBabies: payload,
        },
        {id: '4'},
      ],
    }

    describe('on CREATE_SCREENING_COMPLETE', () => {
      it('returns previous state on error', () => {
        const action = createScreeningFailure('Bad')
        expect(safelySurrenderedBabyReducer(Map(), action)).toEqualImmutable(Map())
      })

      it('copies SSB info from safely surrendered babies', () => {
        const action = createScreeningSuccess(screening)
        expect(safelySurrenderedBabyReducer(Map(), action)).toEqualImmutable(Map({
          persisted: fromJS(payload),
          form: fromJS(payload),
        }))
      })
    })

    describe('on FETCH_SCREENING_COMPLETE', () => {
      it('returns previous state on error', () => {
        const action = fetchScreeningFailure('Bad')
        expect(safelySurrenderedBabyReducer(Map(), action)).toEqualImmutable(Map())
      })

      it('copies SSB info from safely surrendered babies', () => {
        const action = fetchScreeningSuccess(screening)
        expect(safelySurrenderedBabyReducer(Map(), action)).toEqualImmutable(Map({
          persisted: fromJS(payload),
          form: fromJS(payload),
        }))
      })
    })

    describe('on SAVE_SCREENING_COMPLETE', () => {
      it('returns previous state on error', () => {
        const action = saveScreeningFailure('Bad')
        expect(safelySurrenderedBabyReducer(Map(), action)).toEqualImmutable(Map())
      })

      it('copies SSB info from safely surrendered babies', () => {
        const action = saveScreeningSuccess(screening)
        expect(safelySurrenderedBabyReducer(Map(), action)).toEqualImmutable(Map({
          persisted: fromJS(payload),
          form: fromJS(payload),
        }))
      })
    })
  })
})
