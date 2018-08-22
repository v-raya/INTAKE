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

    it('updates the surrendered_by field', () => {
      const action = setField('surrendered_by', 'Somebody')
      expect(safelySurrenderedBabyReducer(initial, action)).toEqualImmutable(
        initial.setIn(['form', 'surrendered_by'], 'Somebody')
      )
    })
    it('updates the relation_to_child field', () => {
      const action = setField('relation_to_child', 'New Relation')
      expect(safelySurrenderedBabyReducer(initial, action)).toEqualImmutable(
        initial.setIn(['form', 'relation_to_child'], 'New Relation')
      )
    })
    it('updates the bracelet_id field', () => {
      const action = setField('bracelet_id', 'New Bracelet')
      expect(safelySurrenderedBabyReducer(initial, action)).toEqualImmutable(
        initial.setIn(['form', 'bracelet_id'], 'New Bracelet')
      )
    })
    it('updates the comment field', () => {
      const action = setField('comments', 'New Comment')
      expect(safelySurrenderedBabyReducer(initial, action)).toEqualImmutable(
        initial.setIn(['form', 'comments'], 'New Comment')
      )
    })
    it('updates the parent_guardian_given_bracelet_id field', () => {
      const action = setField('parent_guardian_given_bracelet_id', 'Yes')
      expect(safelySurrenderedBabyReducer(initial, action)).toEqualImmutable(
        initial.setIn(['form', 'parent_guardian_given_bracelet_id'], 'Yes')
      )
    })
    it('updates the parent_guardian_provided_med_questionaire field', () => {
      const action = setField('parent_guardian_provided_med_questionaire', 'Yes')
      expect(safelySurrenderedBabyReducer(initial, action)).toEqualImmutable(
        initial.setIn(['form', 'parent_guardian_provided_med_questionaire'], 'Yes')
      )
    })
    it('updates the med_questionaire_return_date field', () => {
      const action = setField('med_questionaire_return_date', '2018-05-01')
      expect(safelySurrenderedBabyReducer(initial, action)).toEqualImmutable(
        initial.setIn(['form', 'med_questionaire_return_date'], '2018-05-01')
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
        persisted: Map().set('participant_child', '456'),
        form: Map().set('participant_child', '456'),
      })
      const action = setPersonField('123', ['roles'], ['Victim'])
      expect(safelySurrenderedBabyReducer(state, action)).toEqualImmutable(state)
    })

    it('watches for the addition of victims', () => {
      const action = setPersonField('123', ['roles'], ['Victim'])
      expect(safelySurrenderedBabyReducer(Map(), action)).toEqualImmutable(
        Map().setIn(['form', 'participant_child'], '123')
      )
    })
  })

  describe('on UPDATE_PERSON_COMPLETE', () => {
    it('watches for new perpetrators', () => {
      const action = updatePersonSuccess({first_name: 'John', last_name: 'Doe', roles: ['Perpetrator']})
      expect(safelySurrenderedBabyReducer(Map(), action)).toEqualImmutable(
        Map()
          .setIn(['form', 'surrendered_by'], 'John Doe')
          .setIn(['persisted', 'surrendered_by'], 'John Doe')
      )
    })

    it('ignores non-perpetrators', () => {
      const action = updatePersonSuccess({id: '3', roles: ['Victim']})
      expect(safelySurrenderedBabyReducer(Map(), action)).toEqualImmutable(Map())
    })

    it('copies SSB info from safely surrendered babies', () => {
      const payload = {
        participant_child: '3',
        surrendered_by: 'Unknown',
        relation_to_child: '1592',
        bracelet_id: 'Lightning',
        parent_guardian_given_bracelet_id: 'unknown',
        parent_guardian_provided_med_questionaire: 'unknown',
        comments: 'Yer a wizard, Harry!',
        med_questionaire_return_date: '2001-11-14',
      }
      const action = updatePersonSuccess({
        id: '3',
        roles: ['Victim'],
        safely_surrendered_babies: payload,
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
        participant_child: '3',
        surrendered_by: 'Unknown',
        relation_to_child: '1592',
        bracelet_id: 'Lightning',
        parent_guardian_given_bracelet_id: 'unknown',
        parent_guardian_provided_med_questionaire: 'unknown',
        comments: 'Yer a wizard, Harry!',
        med_questionaire_return_date: '2001-11-14',
      }
      const action = createPersonSuccess({
        id: '3',
        roles: ['Victim'],
        safely_surrendered_babies: payload,
      })

      expect(safelySurrenderedBabyReducer(Map(), action)).toEqualImmutable(Map({
        persisted: fromJS(payload),
        form: fromJS(payload),
      }))
    })
  })

  describe('when reducing actions with multiple participants', () => {
    const payload = {
      participant_child: '3',
      surrendered_by: 'Unknown',
      relation_to_child: '1592',
      bracelet_id: 'Lightning',
      parent_guardian_given_bracelet_id: 'unknown',
      parent_guardian_provided_med_questionaire: 'unknown',
      comments: 'Yer a wizard, Harry!',
      med_questionaire_return_date: '2001-11-14',
    }
    const screening = {
      participants: [
        {id: '2'},
        {
          id: '3',
          safely_surrendered_babies: payload,
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
