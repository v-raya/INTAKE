import {List} from 'immutable'
import {Maybe} from 'utils/maybe'
import {formatForDisplay} from 'data/address'

export const selectParticipants = (state) => state.get('participants', List())

const hasId = (id) => (participant) => participant.get('id') === id

export const selectParticipant = (state, id) => Maybe.of(
  selectParticipants(state).find(hasId(id))
)

export const selectClientIds = (state) =>
  selectParticipants(state).map(
    (client) =>
      client.get('legacy_id') ||
      client.getIn(['legacy_descriptor', 'legacy_id'])
  ).filter(Boolean).toJS()

export const selectRoles = (participant) => participant.get('roles') || List()

export const selectAllRoles = (state) =>
  selectParticipants(state)
    .map(selectRoles)
    .reduce((allRoles, participantRoles) => allRoles.concat(
      participantRoles.filter((role) => !allRoles.includes(role))
    ), List())

const selectAddresses = (state, personId) =>
  selectParticipant(state, personId)
    .map((person) => person.get('addresses'))
    .valueOrElse(List())

export const selectFormattedAddresses = (state, personId) =>
  selectAddresses(state, personId)
    .map(formatForDisplay)
