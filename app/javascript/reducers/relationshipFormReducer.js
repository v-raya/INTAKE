import {
  FETCH_RELATIONSHIPS_COMPLETE,
  SET_RELATIONSHIP_FORM_FIELD,
  UPDATE_RELATIONSHIP,
  UPDATE_RELATIONSHIP_COMPLETE,
} from 'actions/actionTypes'
import {createReducer} from 'utils/createReducer'
import {fromJS} from 'immutable'
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
    relationship: {
      absent_parent_indicator: absent_parent_code === 'Y',
      client_id: id,
      end_date: endDate || null,
      id: relationshipId,
      relationship_type: parseInt(type_code, 10),
      relative_id: relativeId,
      reversed: reversed,
      same_home_status: same_home_code,
      start_date: startDate || null,
    },
    isSaving: false,
  })
}

const setRelationshipForm = (state, {payload: {field, value}}) =>
  state.setIn(['relationship', field], value)

const updateRelationship = (state, {payload: {relationship}, error}) => {
  if (error) {
    return state
  }
  return state.set('relationship', fromJS(relationship))
}

const isSavingButton = (state) => state.set('isSaving', true)

const isNotSavingButton = (state) => state.set('isSaving', false)

const initialState = fromJS({isSaving: false})

export default createReducer(initialState, {
  [FETCH_RELATIONSHIPS_COMPLETE]: isNotSavingButton,
  [LOAD_RELATIONSHIP]: buildRelationship,
  [SET_RELATIONSHIP_FORM_FIELD]: setRelationshipForm,
  [UPDATE_RELATIONSHIP]: isSavingButton,
  [UPDATE_RELATIONSHIP_COMPLETE]: updateRelationship,
})
