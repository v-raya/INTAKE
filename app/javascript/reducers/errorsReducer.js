import {fromJS} from 'immutable'
import {CLEAR_ERRORS} from 'actions/clearErrors'

const initialState = fromJS({})

export const GENERIC_ERROR = 'The application encountered an error'
export const PROCESS_ERROR = `${GENERIC_ERROR} and could not process it`
export const PROCESS_TYPE = 'PROCESS_TYPE'

export default function errorsReducer(state = initialState, action) {
  try {
    const {payload, error, type} = action

    if (error) {
      const {
        error: {
          responseJSON: {
            api_response_body: {issue_details} = {},
          } = {},
        } = {},
      } = payload

      if (issue_details) {
        return state.set(type, fromJS(issue_details))
      } else {
        return state.set(type, fromJS({error: [GENERIC_ERROR]}))
      }
    }

    if (type === CLEAR_ERRORS) {
      return initialState
    }

    return state.delete(type)
  } catch (error) {
    return state.set(PROCESS_TYPE, fromJS({error: [PROCESS_ERROR]}))
  }
}
