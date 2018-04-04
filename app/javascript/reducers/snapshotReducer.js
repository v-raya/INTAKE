import {CLEAR_SNAPSHOT} from 'actions/actionTypes'
import {createReducer} from 'utils/createReducer'
import {Map} from 'immutable'

export default createReducer(Map(), {
  [CLEAR_SNAPSHOT]: () => Map(),
})
