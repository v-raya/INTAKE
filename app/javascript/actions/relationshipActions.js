import {CREATE_RELATIONSHIP, SET_RELATIONSHIP_FORM_FIELD} from 'actions/actionTypes'

export const createRelationship = (person, relationship) => ({
  type: CREATE_RELATIONSHIP,
  payload: {person, relationship},
})

export const setRelationshipForm = (field, value) => ({
  type: SET_RELATIONSHIP_FORM_FIELD,
  payload: {field, value},
})
