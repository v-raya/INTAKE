import {
  FETCH_RELATIONSHIPS,
  FETCH_RELATIONSHIPS_COMPLETE,
  CLEAR_RELATIONSHIPS,
} from 'actions/actionTypes'

export const BATCH_CREATE_RELATIONSHIPS = 'BATCH_CREATE_RELATIONSHIPS'
export const BATCH_CREATE_RELATIONSHIPS_COMPLETE = 'BATCH_CREATE_RELATIONSHIPS_COMPLETE'
export const BATCH_CREATE_RELATIONSHIPS_ERROR = 'BATCH_CREATE_RELATIONSHIPS_ERROR'

export const batchCreateRelationships = () => ({
  type: BATCH_CREATE_RELATIONSHIPS,
})

export const batchCreateRelationshipsFaliure = (error) => ({
  type: BATCH_CREATE_RELATIONSHIPS_ERROR,
  payload: {error},
  error: true,
})

export const batchCreateRelationshipsSuccess = (relationships) => ({
  type: BATCH_CREATE_RELATIONSHIPS_COMPLETE,
  payload: {relationships},
})

export function clearRelationships() {
  return {type: CLEAR_RELATIONSHIPS}
}
export function fetchRelationshipsSuccess(relationships) {
  return {type: FETCH_RELATIONSHIPS_COMPLETE, payload: {relationships}}
}
export function fetchRelationshipsFailure(error) {
  return {type: FETCH_RELATIONSHIPS_COMPLETE, payload: {error}, error: true}
}
export function fetchRelationships(ids, screeningId = null) {
  return {type: FETCH_RELATIONSHIPS, payload: {ids, screeningId}}
}
