import {fromJS} from 'immutable'
import {CLEAR_ERRORS} from 'actions/clearErrors'

const initialState = fromJS({})

export default function errorsReducer(state = initialState, action) {
  const {payload, error, type} = action

  if (error) {
    const {error: {responseJSON = {}} = {}} = payload
    const {api_response_body: {issue_details} = {}} = responseJSON
    return state.set(type, fromJS(issue_details || payload))
  }

  if (type === CLEAR_ERRORS) {
    return initialState
  }

  return state.delete(type)
}
