import {CREATE_RELATIONSHIP} from 'actions/actionTypes'
import {createReducer} from 'utils/createReducer'
import {Map, fromJS} from 'immutable'

const loadRelationship = (state, {payload: {person, relationship}}) => {
  const {
    absent_parent_code,
    endDate,
    relationshipId,
    indexed_person_relationship,
    relative_id,
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
    relationship_type: parseInt(indexed_person_relationship, 10),
    relative_id: relative_id,
    reverted: reverted,
    same_home_status: same_home_code,
    start_date: startDate || '',
  })
}

export default createReducer(Map(), {
  [CREATE_RELATIONSHIP]: loadRelationship,
})
