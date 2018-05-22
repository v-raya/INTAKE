import {Map} from 'immutable'
import {createReducer} from 'utils/createReducer'

const initialState = Map({
  surrenderedBy: 'Hagrid',
  relationToChild: 'Groundskeeper',
  braceletId: 'Lightning',
  parentGuardGivenBraceletId: true,
  parentGuardProvMedicalQuestionaire: false,
  comments: 'Yer a wizard, Harry!',
  medQuestionaireReturnDate: '2001-11-14',
})

export default createReducer(initialState, {
  ['FETCH_SSB_COMPLETE']: (state, {payload, error}) => {
    if (error) { return state }
    return state.set('participant_child_id', payload.participant_child_id)
  },
})
