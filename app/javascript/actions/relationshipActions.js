import {CREATE_RELATIONSHP} from 'actions/actionTypes'

export const createRelationship = (person, relationship) => ({
  type: CREATE_RELATIONSHP,
  payload: {person, relationship},
})
