import {
  CREATE_SNAPSHOT_PERSON,
  CREATE_PERSON_COMPLETE,
  CLEAR_PEOPLE,
} from 'actions/personCardActions'
import {createReducer} from 'utils/createReducer'
import {List} from 'immutable'

export default createReducer(List(), {
  [CREATE_SNAPSHOT_PERSON](state, {payload: {id}}) {
    // The CREATE_PERSON event fires off a saga, so we store the pending id in Redux to prevent dupe actions
    return state.unshift(id)
  },
  [CREATE_PERSON_COMPLETE](state, {payload: {person}, error}) {
    if (error) {
      // TODO - We should probably clear the person here if we can tell they were the one who errored
      return state
    } else {
      return state.filter((id) => id !== person.id)
    }
  },
  [CLEAR_PEOPLE]() {
    return List()
  },
})
