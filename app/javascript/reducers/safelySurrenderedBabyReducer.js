import {fromJS} from 'immutable'
import {
  FETCH_SSB_COMPLETE,
  SAVE_SSB_FIELD,
} from 'actions/safelySurrenderedBabyActions'
import {createReducer} from 'utils/createReducer'

const initialState = fromJS({
  participant_child_id: '1566',
  persisted: {
    surrenderedBy: 'Hagrid',
    relationToChild: '1592',
    braceletId: 'Lightning',
    parentGuardGivenBraceletId: 'unknown',
    parentGuardProvMedicalQuestionaire: 'unknown',
    comments: 'Yer a wizard, Harry!',
    medQuestionaireReturnDate: '2001-11-14',
  },
  form: {
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
    return state.set('participant_child_id', payload.participant_child_id)
  },
  [SAVE_SSB_FIELD]: (state, {payload: {field, value}}) =>
    state.setIn(['form', field], value),
})
