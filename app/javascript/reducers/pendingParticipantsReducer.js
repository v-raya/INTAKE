import {
  CREATE_SNAPSHOT_PERSON,
  CREATE_PERSON_COMPLETE,
  CREATE_PERSON,
  CLEAR_PEOPLE,
} from 'actions/personCardActions'
import {createReducer} from 'utils/createReducer'
import {List} from 'immutable'

export default createReducer(List(), {
  [CREATE_SNAPSHOT_PERSON](state, {payload: {id}}) {
    return state.unshift(id)
  },
  [CREATE_PERSON](state, {payload: {person}}) {
    const id = person.legacy_descriptor && person.legacy_descriptor.legacy_id
    return state.unshift(id)
  },
  [CREATE_PERSON_COMPLETE](state, {payload: {person}, error}) {
    if (error) {
      return List()
    } else {
      return state.filter((id) => id !== person.id)
    }
  },
  [CLEAR_PEOPLE]() {
    return List()
  },
})
