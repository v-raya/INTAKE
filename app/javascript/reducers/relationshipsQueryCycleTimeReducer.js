import {
  CREATE_PERSON, CLEAR_TIME,
} from 'actions/personCardActions'
import {createReducer} from 'utils/createReducer'
import {List} from 'immutable'
import moment from 'moment'

export default createReducer(List(), {
  [CREATE_PERSON](state) {
    return state.concat({personCreatedAtTime: moment().valueOf()})
  },
  [CLEAR_TIME]() {
    return List()
  },
})
