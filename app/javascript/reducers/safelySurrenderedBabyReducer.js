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
import {
  FETCH_SSB_COMPLETE,
  SET_SSB_FIELD,
} from 'actions/safelySurrenderedBabyActions'
import {SAVE_SCREENING_COMPLETE} from 'actions/screeningActions'
import {createReducer} from 'utils/createReducer'

const initialState = fromJS({
  persisted: {},
  form: {
    surrenderedBy: null,
    relationToChild: '1592',
    braceletId: '',
    parentGuardGivenBraceletId: 'unknown',
    parentGuardProvMedicalQuestionaire: 'unknown',
    comments: '',
    medQuestionaireReturnDate: '',
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
  [FETCH_SSB_COMPLETE]: (state, {payload, error}) => {
    if (error) { return state }
    return state
      .setIn(['persisted', 'participantChildId'], payload.participant_child_id)
      .setIn(['form', 'participantChildId'], payload.participant_child_id)
  },
  [SET_SSB_FIELD]: (state, {payload: {field, value}}) =>
    state.setIn(['form', field], value),
  [SET_PEOPLE_FORM_FIELD]: (state, {payload: {personId, fieldSet, value: roles}}) => {
    if (
      fieldSet[0] !== 'roles' ||
      state.getIn(['form', 'participantChildId']) ||
      !roles.includes('Victim')
    ) {
      return state
    }
    return state.setIn(['form', 'participantChildId'], personId)
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
      .setIn(['form', 'surrenderedBy'], id)
      .setIn(['persisted', 'surrenderedBy'], id)
  },
})
