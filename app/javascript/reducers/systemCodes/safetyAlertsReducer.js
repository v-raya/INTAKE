import {createReducer} from 'utils/createReducer'
import {findByCategory} from 'selectors'
import {FETCH_SYSTEM_CODES_COMPLETE} from 'actions/systemCodesActions'
import {List, fromJS} from 'immutable'

const SAFETY_ALERT = 'safety_alert'
export default createReducer(List(), {
  [FETCH_SYSTEM_CODES_COMPLETE](state, {payload: {systemCodes}, error}) {
    if (error) {
      return state
    } else {
      return fromJS(findByCategory(systemCodes, SAFETY_ALERT))
        .sort((a, b) =>
          parseInt(a.get('code'), 10) - parseInt(b.get('code'), 10)
        )
    }
  },
})
