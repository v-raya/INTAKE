import {List} from 'immutable'

export const getClientIdsSelector = (state) =>
  state.get('participants', List()).map(
    (client) => client.get('legacy_id',
      client.getIn(['legacy_descriptor', 'legacy_id'],
        null))
  ).filter(Boolean).toJS()
