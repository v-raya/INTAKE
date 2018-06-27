import {
  FETCH_RELATIONSHIPS,
  FETCH_RELATIONSHIPS_COMPLETE,
  CLEAR_RELATIONSHIPS,
  SET_RELATIONSHIP_FORM_FIELD,
} from 'actions/actionTypes'

export function clearRelationships() {
  return {type: CLEAR_RELATIONSHIPS}
}
export function fetchRelationshipsSuccess(relationships) {
  return {type: FETCH_RELATIONSHIPS_COMPLETE, payload: {relationships}}
}
export function fetchRelationshipsFailure(error) {
  return {type: FETCH_RELATIONSHIPS_COMPLETE, payload: {error}, error: true}
}
export function fetchRelationships(ids) {
  return {type: FETCH_RELATIONSHIPS, payload: {ids}}
}
export function setField(fieldSet, personId, relationship, value) {
  return {type: SET_RELATIONSHIP_FORM_FIELD, payload: {fieldSet, personId, relationship, value}}
}
