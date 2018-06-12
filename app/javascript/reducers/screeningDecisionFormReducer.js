import {
  RESET_SCREENING_DECISION_FIELD_VALUES,
  SET_SCREENING_DECISION_FIELD,
  TOUCH_SCREENING_DECISION_FIELD,
  TOUCH_ALL_SCREENING_DECISION_FIELDS,
} from 'actions/screeningDecisionFormActions'
import {FETCH_SCREENING_COMPLETE} from 'actions/actionTypes'
import {createReducer} from 'utils/createReducer'
import {untouched} from 'utils/formTouch'
import {Map, fromJS} from 'immutable'

export default createReducer(Map(), {
  [FETCH_SCREENING_COMPLETE](state, {payload: {screening}, error}) {
    if (error) { return state }

    const {
      screening_decision,
      screening_decision_detail,
      screening_contact_reference,
      access_restrictions,
      restrictions_rationale,
      additional_information,
    } = screening
    return fromJS({
      screening_decision: untouched(screening_decision),
      screening_decision_detail: untouched(screening_decision_detail),
      screening_contact_reference: untouched(screening_contact_reference),
      access_restrictions: untouched(access_restrictions),
      restrictions_rationale: untouched(restrictions_rationale),
      additional_information: untouched(additional_information),
    })
  },
  [RESET_SCREENING_DECISION_FIELD_VALUES](state, {payload: {
    screening_decision,
    screening_decision_detail,
    screening_contact_reference,
    access_restrictions,
    restrictions_rationale,
    additional_information,
  }}) {
    return state.setIn(['screening_decision', 'value'], screening_decision)
      .setIn(['screening_decision_detail', 'value'], screening_decision_detail)
      .setIn(['screening_contact_reference', 'value'], screening_contact_reference)
      .setIn(['access_restrictions', 'value'], access_restrictions)
      .setIn(['restrictions_rationale', 'value'], restrictions_rationale)
      .setIn(['additional_information', 'value'], additional_information)
  },
  [SET_SCREENING_DECISION_FIELD](state, {payload: {field, value}}) {
    return state.setIn([field, 'value'], value)
  },
  [TOUCH_SCREENING_DECISION_FIELD](state, {payload: {field}}) {
    return state.setIn([field, 'touched'], true)
  },
  [TOUCH_ALL_SCREENING_DECISION_FIELDS](state) {
    const fieldsWithTouch = [
      'screening_decision',
      'screening_decision_detail',
      'screening_contact_reference',
      'additional_information',
      'access_restrictions',
      'restrictions_rationale',
    ]
    return fieldsWithTouch.reduce((newState, field) => newState.setIn([field, 'touched'], true), state)
  },
})
