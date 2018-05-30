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

const initialState = fromJS({
  persisted: {},
  form: {
    surrendered_by: null,
    relation_to_child: '1592',
    bracelet_id: '',
    parent_guardian_given_bracelet_id: 'unknown',
    parent_guardian_provided_med_questionaire: 'unknown',
    comments: '',
    med_questionaire_return_date: '',
  },
})

const reduceSSBFromParticipants = (state, {payload: {screening: {participants} = {}}, error}) => {
  if (error || !participants) { return state }

  const baby = participants.find((participant) => participant.safelySurrenderedBabies)
  if (!baby) { return state }
  return state
    .set('persisted', fromJS(baby.safelySurrenderedBabies))
    .set('form', fromJS(baby.safelySurrenderedBabies))
}

const reduceSSBFromParticipant = (state, {payload: {person: {safelySurrenderedBabies} = {}}, error}) => {
  if (error || !safelySurrenderedBabies) { return state }

  const immutablePayload = fromJS(safelySurrenderedBabies)
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
  [UPDATE_PERSON_COMPLETE]: (state, {payload: {person: {id, roles, safelySurrenderedBabies} = {}}, error}) => {
    if (error) { return state }

    if (safelySurrenderedBabies) {
      const immutablePayload = fromJS(safelySurrenderedBabies)
      return state.set('persisted', immutablePayload).set('form', immutablePayload)
    }

    if (error || !roles || !roles.includes('Perpetrator')) { return state }
    return state
      .setIn(['form', 'surrendered_by'], id)
      .setIn(['persisted', 'surrendered_by'], id)
  },
})
