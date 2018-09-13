import {Map} from 'immutable'

export const selectRelationship = (state) => (state.get('relationshipForm', Map()))
