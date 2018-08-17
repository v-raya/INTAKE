import {CREATE_RELATIONSHIP} from 'actions/actionTypes'

export const createRelationship = (person, relationship) => ({
  type: CREATE_RELATIONSHIP,
  payload: {person, relationship},
})
