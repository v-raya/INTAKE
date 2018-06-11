import {List} from 'immutable'

export const selectParticipants = (state) => state.get('participants', List())

export const getClientIds = (state) =>
  selectParticipants(state).map(
    (client) =>
      client.get('legacy_id') ||
      client.getIn(['legacy_descriptor', 'legacy_id'])
  ).filter(Boolean).toJS()
