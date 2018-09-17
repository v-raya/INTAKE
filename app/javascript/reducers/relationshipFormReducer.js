import {
  SET_RELATIONSHIP_FORM_FIELD,
  UPDATE_RELATIONSHIP_COMPLETE,
} from 'actions/actionTypes'
import {createReducer} from 'utils/createReducer'
import {Map, fromJS} from 'immutable'
import {LOAD_RELATIONSHIP} from 'actions/relationshipFormActions'

const buildRelationship = (state, {payload: {person, relationship}}) => {
  const {
    absent_parent_code,
    endDate,
    relationshipId,
    type_code,
    relativeId,
    reversed,
    same_home_code,
    startDate,
  } = relationship
  const {id} = person

  return fromJS({
    absent_parent_indicator: absent_parent_code === 'Y',
    client_id: id,
    end_date: endDate || null,
    id: relationshipId,
    relationship_type: parseInt(type_code, 10),
    relative_id: relativeId,
    reversed: reversed,
    same_home_status: same_home_code,
    start_date: startDate || null,
  })
}

const setRelationshipForm = (state, {payload: {field, value}}) =>
  state.set(field, value)

const updateRelationship = (state, {payload: {relationship}, error}) => (
  (error) ? state : fromJS(relationship)
)

export default createReducer(Map(), {
  [LOAD_RELATIONSHIP]: buildRelationship,
  [SET_RELATIONSHIP_FORM_FIELD]: setRelationshipForm,
  [UPDATE_RELATIONSHIP_COMPLETE]: updateRelationship,
})
