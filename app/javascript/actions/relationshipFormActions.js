import {
  SET_RELATIONSHIP_FORM_FIELD,
  UPDATE_RELATIONSHIP,
  UPDATE_RELATIONSHIP_COMPLETE,
} from 'actions/actionTypes'

export const LOAD_RELATIONSHIP = 'LOAD_RELATIONSHIP'

export const loadRelationship = (person, relationship) => ({
  type: LOAD_RELATIONSHIP,
  payload: {person, relationship},
})

export const setRelationshipForm = (field, value) => ({
  type: SET_RELATIONSHIP_FORM_FIELD,
  payload: {field, value},
})

export const updateRelationship = (id) => ({
  type: UPDATE_RELATIONSHIP,
  payload: {id},
})

export const updateRelationshipFailure = (error) => ({
  type: UPDATE_RELATIONSHIP_COMPLETE,
  payload: {error},
  error: true,
})

export const updateRelationshipSuccess = (relationship) => ({
  type: UPDATE_RELATIONSHIP_COMPLETE,
  payload: {relationship},
})
