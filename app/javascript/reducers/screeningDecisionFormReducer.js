import {
  RESET_SCREENING_DECISION_FIELD_VALUES,
  SET_SCREENING_DECISION_FIELD,
  TOUCH_SCREENING_DECISION_FIELD,
  TOUCH_ALL_SCREENING_DECISION_FIELDS,
} from 'actions/screeningDecisionFormActions'
import {FETCH_SCREENING_COMPLETE} from 'actions/actionTypes'
import {createReducer} from 'utils/createReducer'
import {toUntouchedObject} from 'utils/formTouch'
import {Map} from 'immutable'

const FIELDS = [
  'screening_decision',
  'screening_decision_detail',
  'screening_contact_reference',
  'access_restrictions',
  'restrictions_rationale',
  'additional_information',
]
export default createReducer(Map(), {
  [FETCH_SCREENING_COMPLETE](state, {payload: {screening}, error}) {
    if (error) { return state }
    return toUntouchedObject(FIELDS, screening)
  },
  [RESET_SCREENING_DECISION_FIELD_VALUES](state, {payload}) {
    return FIELDS.reduce(
      (newState, field) => newState.setIn([field, 'value'], payload[field]),
      state
    )
  },
  [SET_SCREENING_DECISION_FIELD](state, {payload: {field, value}}) {
    return state.setIn([field, 'value'], value)
  },
  [TOUCH_SCREENING_DECISION_FIELD](state, {payload: {field}}) {
    return state.setIn([field, 'touched'], true)
  },
  [TOUCH_ALL_SCREENING_DECISION_FIELDS](state) {
    return FIELDS.reduce(
      (newState, field) => newState.setIn([field, 'touched'], true),
      state
    )
  },
})
