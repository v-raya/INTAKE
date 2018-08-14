import {
  CREATE_PERSON
} from 'actions/personCardActions'
import {createReducer} from 'utils/createReducer'
import {List} from 'immutable'
import moment from 'moment'

export default createReducer(List(), {
  [CREATE_PERSON](state) {
    return state.concat({personCreatedAtTime: moment().valueOf()})
  }
})