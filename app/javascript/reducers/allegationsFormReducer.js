import {
  RESET_ALLEGATIONS_FORM,
  SET_ALLEGATION_TYPES,
} from 'actions/allegationsFormActions'
import {
  FETCH_SCREENING_COMPLETE,
} from 'actions/actionTypes'
import {
  DELETE_PERSON_COMPLETE,
  UPDATE_PERSON_COMPLETE,
} from 'actions/personCardActions'
import {SAVE_SCREENING_COMPLETE} from 'actions/screeningActions'
import {createReducer} from 'utils/createReducer'
import {List, fromJS} from 'immutable'

export const buildFerbAllegations = (allegations) => (
  fromJS(
    allegations.map((allegation) => ({
      id: allegation.id && allegation.id.toString(),
      victimId: allegation.victim_person_id.toString(),
      perpetratorId: allegation.perpetrator_person_id.toString(),
      allegationTypes: allegation.types,
    }))
  )
)

const reduceFromScreening = (state, {payload: {screening}, error}) => {
  if (error) {
    return state
  }
  return buildFerbAllegations(screening.allegations || [])
}

export default createReducer(List(), {
  [FETCH_SCREENING_COMPLETE]: reduceFromScreening,
  [SAVE_SCREENING_COMPLETE]: reduceFromScreening,
  [SET_ALLEGATION_TYPES](state, {payload: {victimId, perpetratorId, allegationTypes}}) {
    const notFound = -1
    const allegationIndex = state.findIndex((allegation) => (
      allegation.get('victimId') === victimId && allegation.get('perpetratorId') === perpetratorId
    ))
    if (allegationIndex === notFound) {
      return state.push(fromJS({
        id: null,
        perpetratorId,
        victimId,
        allegationTypes,
      }))
    } else {
      return state.update(allegationIndex, (allegation) => (allegation.set('allegationTypes', List(allegationTypes))))
    }
  },
  [RESET_ALLEGATIONS_FORM](_state, {payload: {allegations}}) {
    return buildFerbAllegations(allegations)
  },
  [DELETE_PERSON_COMPLETE](state, {payload: {id}, error}) {
    if (error) {
      return state
    } else {
      return state.filterNot((allegation) => (
        allegation.get('victimId') === id || allegation.get('perpetratorId') === id
      ))
    }
  },
  [UPDATE_PERSON_COMPLETE](state, {payload: {person = {}}, error}) {
    if (error) { return state }
    const {id, roles} = person
    let updatedAllegations = state
    if (!roles.includes('Victim')) {
      updatedAllegations = updatedAllegations.filterNot((allegation) => (
        allegation.get('victimId') === id
      ))
    }
    if (!roles.includes('Perpetrator')) {
      updatedAllegations = updatedAllegations.filterNot((allegation) => (
        allegation.get('perpetratorId') === id
      ))
    }
    return updatedAllegations
  },
})
