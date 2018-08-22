import {Map} from 'immutable'

export const selectRelationship = (state) => (state.get('relationship', Map()))
