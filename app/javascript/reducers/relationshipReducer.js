import {CREATE_RELATIONSHIP} from 'actions/actionTypes'
import {createReducer} from 'utils/createReducer'
import {Map, fromJS} from 'immutable'

const loadRelationship = (state, {payload: {person, relationship}}) => {
  const {
    absent_parent_code,
    endDate,
    relationshipId,
    type_code,
    relativeId,
    reverted,
    same_home_code,
    startDate,
  } = relationship
  const {id} = person

  return fromJS({
    absent_parent_indicator: (absent_parent_code === 'Y'),
    client_id: id,
    end_date: endDate || '',
    id: relationshipId,
    relationship_type: parseInt(type_code, 10),
    relative_id: relativeId,
    reverted: reverted,
    same_home_status: same_home_code,
    start_date: startDate || '',
  })
}

export default createReducer(Map(), {
  [CREATE_RELATIONSHIP]: loadRelationship,
})
