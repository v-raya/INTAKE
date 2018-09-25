import {
  CREATE_SNAPSHOT_PERSON,
  CREATE_PERSON_COMPLETE,
  CREATE_PERSON,
  CLEAR_PEOPLE,
} from 'actions/personCardActions'
import {createReducer} from 'utils/createReducer'
import {List} from 'immutable'
import {Maybe} from 'utils/maybe'

const getLegacyDescriptor = (person) => Maybe.of(person.legacy_descriptor)

const getLegacyId = (legacyDescriptor) => Maybe.of(legacyDescriptor.legacy_id)

const isParticipant = (person) => (id) =>
  getLegacyDescriptor(person)
    .chain(getLegacyId)
    .map((legacyId) => legacyId === id)
    .valueOrElse(false)

const isParticipantLegacy = (person) => (id) =>
  Maybe.of(person.legacy_id).map((legacyId) => legacyId === id).valueOrElse(false)

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
        .filterNot(isParticipant(person))
        .filterNot(isParticipantLegacy(person))
    }
  },
  [CLEAR_PEOPLE]() {
    return List()
  },
})
