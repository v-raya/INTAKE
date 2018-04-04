import {
  CREATE_SNAPSHOT_COMPLETE,
  CLEAR_SNAPSHOT,
} from 'actions/actionTypes'
import {createReducer} from 'utils/createReducer'
import {Map} from 'immutable'

export default createReducer(Map(), {
  [CREATE_SNAPSHOT_COMPLETE]: () => Map(),
  [CLEAR_SNAPSHOT]: () => Map(),
})
