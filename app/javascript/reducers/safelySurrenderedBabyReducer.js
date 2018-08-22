import {fromJS} from 'immutable'
import {
  CREATE_SCREENING_COMPLETE,
  FETCH_SCREENING_COMPLETE,
} from 'actions/actionTypes'
import {SET_PEOPLE_FORM_FIELD} from 'actions/peopleFormActions'
import {
  CREATE_PERSON_COMPLETE,
  UPDATE_PERSON_COMPLETE,
} from 'actions/personCardActions'
import {SET_SSB_FIELD} from 'actions/safelySurrenderedBabyActions'
import {SAVE_SCREENING_COMPLETE} from 'actions/screeningActions'
import {createReducer} from 'utils/createReducer'
import nameFormatter from 'utils/nameFormatter'

const initialState = fromJS({
  persisted: {},
  form: {
    surrendered_by: null,
    relation_to_child: '1592',
    bracelet_id: '',
    parent_guardian_given_bracelet_id: 'U',
    parent_guardian_provided_med_questionaire: 'U',
    comments: '',
    med_questionaire_return_date: '',
  },
})

const reduceSSBFromParticipants = (state, {payload: {screening: {participants} = {}}, error}) => {
  if (error || !participants) { return state }

  const baby = participants.find((participant) => participant.safely_surrendered_babies)
  if (!baby) { return state }
  return state
    .set('persisted', fromJS(baby.safely_surrendered_babies))
    .set('form', fromJS(baby.safely_surrendered_babies))
}

const reduceSSBFromParticipant = (state, {payload: {person: {safely_surrendered_babies} = {}}, error}) => {
  if (error || !safely_surrendered_babies) { return state }

  const immutablePayload = fromJS(safely_surrendered_babies)
  return state.set('persisted', immutablePayload).set('form', immutablePayload)
}

export default createReducer(initialState, {
  [SET_SSB_FIELD]: (state, {payload: {field, value}}) =>
    state.setIn(['form', field], value),
  [SET_PEOPLE_FORM_FIELD]: (state, {payload: {personId, fieldSet, value: roles}}) => {
    if (
      fieldSet[0] !== 'roles' ||
      state.getIn(['form', 'participant_child']) ||
      !roles.includes('Victim')
    ) {
      return state
    }
    return state.setIn(['form', 'participant_child'], personId)
  },
  [CREATE_SCREENING_COMPLETE]: reduceSSBFromParticipants,
  [FETCH_SCREENING_COMPLETE]: reduceSSBFromParticipants,
  [SAVE_SCREENING_COMPLETE]: reduceSSBFromParticipants,
  [CREATE_PERSON_COMPLETE]: reduceSSBFromParticipant,
  [UPDATE_PERSON_COMPLETE]: (state, {payload: {person = {}}, error}) => {
    const {roles, safely_surrendered_babies} = person
    if (error) { return state }

    if (safely_surrendered_babies) {
      const immutablePayload = fromJS(safely_surrendered_babies)
      return state.set('persisted', immutablePayload).set('form', immutablePayload)
    }

    if (error || !roles || !roles.includes('Perpetrator')) { return state }
    const name = nameFormatter(person)
    return state
      .setIn(['form', 'surrendered_by'], name)
      .setIn(['persisted', 'surrendered_by'], name)
  },
})
