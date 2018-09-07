import {SET_CREATE_RELATION_BTN_STATUS} from 'actions/actionTypes'
import {createReducer} from 'utils/createReducer'
import {Map, fromJS} from 'immutable'


const setCreateRelationshipsButtonStatus = (state, {payload: {participants}}) => {
  console.log('inside reducer')
  let createRelationshipsButtonStatus = false
  console.log(participants.size)
  if (participants.size > 1 || participants.length > 1){
    createRelationshipsButtonStatus = true
  }
  console.log('createRelationshipsButtonStatus')
  console.log(createRelationshipsButtonStatus)
return fromJS({createRelationshipsButtonStatus: createRelationshipsButtonStatus})
}


export default createReducer(Map(), {
  [SET_CREATE_RELATION_BTN_STATUS] :setCreateRelationshipsButtonStatus})