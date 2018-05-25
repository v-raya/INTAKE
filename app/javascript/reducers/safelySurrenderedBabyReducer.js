import {fromJS} from 'immutable'
import {
  FETCH_SSB_COMPLETE,
  SAVE_SSB_COMPLETE,
  SET_SSB_FIELD,
} from 'actions/safelySurrenderedBabyActions'
import {createReducer} from 'utils/createReducer'

const initialState = fromJS({
  persisted: {
    participantChildId: '1566',
    surrenderedBy: 'Hagrid',
    relationToChild: '1592',
    braceletId: 'Lightning',
    parentGuardGivenBraceletId: 'unknown',
    parentGuardProvMedicalQuestionaire: 'unknown',
    comments: 'Yer a wizard, Harry!',
    medQuestionaireReturnDate: '2001-11-14',
  },
  form: {
    participantChildId: '1566',
    surrenderedBy: 'Hagrid',
    relationToChild: '1592',
    braceletId: 'Lightning',
    parentGuardGivenBraceletId: 'unknown',
    parentGuardProvMedicalQuestionaire: 'unknown',
    comments: 'Yer a wizard, Harry!',
    medQuestionaireReturnDate: '2001-11-14',
  },
})

export default createReducer(initialState, {
  [FETCH_SSB_COMPLETE]: (state, {payload, error}) => {
    if (error) { return state }
    return state
      .setIn(['persisted', 'participantChildId'], payload.participant_child_id)
      .setIn(['form', 'participantChildId'], payload.participant_child_id)
  },
  [SAVE_SSB_COMPLETE]: (state, {payload, error}) => {
    if (error) { return state }
    const immutablePayload = fromJS(payload)
    return state.set('persisted', immutablePayload).set('form', immutablePayload)
  },
  [SET_SSB_FIELD]: (state, {payload: {field, value}}) =>
    state.setIn(['form', field], value),
})
