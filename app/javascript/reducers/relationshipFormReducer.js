import {
  SET_RELATIONSHIP_FORM_FIELD,
  UPDATE_RELATIONSHIP_COMPLETE,
} from 'actions/actionTypes'
import {createReducer} from 'utils/createReducer'
import {Map, fromJS} from 'immutable'
import {LOAD_RELATIONSHIP} from 'actions/relationshipFormActions'
import {untouched} from 'utils/formTouch'

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
    absent_parent_indicator: untouched(absent_parent_code === 'Y'),
    client_id: id,
    end_date: untouched(endDate || ''),
    id: relationshipId,
    relationship_type: untouched(parseInt(type_code, 10)),
    relative_id: relativeId,
    reversed: reversed,
    same_home_status: untouched(same_home_code),
    start_date: untouched(startDate || ''),
  })
}

const setRelationshipForm = (state, {payload: {field, value}}) =>
  state.setIn([field, 'value'], value)

const updateRelationship = (state, {payload: {relationship}, error}) => (
  (error) ? state : fromJS(relationship)
)

export default createReducer(Map(), {
  [LOAD_RELATIONSHIP]: buildRelationship,
  [SET_RELATIONSHIP_FORM_FIELD]: setRelationshipForm,
  [UPDATE_RELATIONSHIP_COMPLETE]: updateRelationship,
})
