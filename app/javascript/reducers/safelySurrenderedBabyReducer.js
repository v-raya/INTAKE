import {fromJS} from 'immutable'
import {createReducer} from 'utils/createReducer'

const initialState = null

export default createReducer(initialState, {
  ['FETCH_SSB_COMPLETE']: (state, {payload, error}) => {
    if (error) { return state }
    return fromJS(payload)
  },
})
