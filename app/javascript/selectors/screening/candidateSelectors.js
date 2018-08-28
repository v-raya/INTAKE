import {List} from 'immutable'

export const selectCandidates = (state, id) =>
  state.get('candidatesForm').get(id, List())
