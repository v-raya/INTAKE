import {
  CREATE_SCREENING,
  CREATE_SCREENING_COMPLETE,
  CLEAR_SCREENING,
  FETCH_SCREENING,
  FETCH_SCREENING_COMPLETE,
  SUBMIT_SCREENING,
  SUBMIT_SCREENING_COMPLETE,
  SUBMIT_SCREENING_CONTACT_COMPLETE,
} from 'actions/actionTypes'

export const SAVE_SCREENING = 'SAVE_SCREENING'
export const SAVE_SCREENING_COMPLETE = 'SAVE_SCREENING_COMPLETE'
export const CLEAR_CARD_EDITS = 'CLEAR_CARD_EDITS'
export function createScreeningSuccess(screening) {
  return {type: CREATE_SCREENING_COMPLETE, payload: {screening}}
}
export function createScreeningFailure(error) {
  return {type: CREATE_SCREENING_COMPLETE, payload: {error}, error: true}
}
export function createScreening() {
  return {type: CREATE_SCREENING}
}
export function fetchScreeningSuccess(screening) {
  return {type: FETCH_SCREENING_COMPLETE, payload: {screening}}
}
export function fetchScreeningFailure(error) {
  return {type: FETCH_SCREENING_COMPLETE, payload: {error}, error: true}
}
export function fetchScreening(id) {
  return {type: FETCH_SCREENING, payload: {id}}
}
export function saveSuccess(screening) {
  return {type: SAVE_SCREENING_COMPLETE, payload: {screening}}
}
export function saveFailure(error) {
  return {type: SAVE_SCREENING_COMPLETE, payload: {error}, error: true}
}
export function saveFailureFromNoParticipants() {
  /*
    This failure originates from attempts to update a screening without
    specifying the participants. Because participants are stored separately from
    the screening in Redux, you must explicitly combine them when PUT-ing. We
    reject attempts with undefined participants, as they are likely mistakes and
    will cause the API to delete all participants on the screening!
  */
  return saveFailure({
    type: 'invariant-violation',
    friendly_message: 'Attempt to update screening with undefined participants.',
  })
}
export function saveCard(card) {
  return {type: SAVE_SCREENING, payload: {card}}
}
export function clearCardEdits(card) {
  return {type: CLEAR_CARD_EDITS, payload: {card}}
}
export function submitScreeningSuccess(screening) {
  return {type: SUBMIT_SCREENING_COMPLETE, payload: {screening}}
}
export function submitScreeningFailure(error) {
  return {type: SUBMIT_SCREENING_COMPLETE, payload: {error}, error: true}
}
export function submitScreeningContactSuccess(contact) {
  return {type: SUBMIT_SCREENING_CONTACT_COMPLETE, payload: {contact}}
}
export function submitScreeningContactFailure(error) {
  return {type: SUBMIT_SCREENING_CONTACT_COMPLETE, payload: {error}, error: true}
}
export function submitScreening(id) {
  return {type: SUBMIT_SCREENING, payload: {id}}
}
export function clearScreening() {
  return {type: CLEAR_SCREENING}
}
