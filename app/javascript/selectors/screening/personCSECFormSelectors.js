import {fromJS, Map, List} from 'immutable'
import {
  isRequiredCreate,
  isFutureDatetimeCreate,
  isBeforeDatetimeCreate,
  combineCompact,
  hasRequiredValuesCreate,
} from 'utils/validator'
import {selectCsec} from 'selectors/screening/personCardSelectors'

export const getPersonCSECDetailsSelector = (state, personId) => {
  const person = state.getIn(['peopleForm', personId], Map())
  return fromJS({
    CSECTypes: person.getIn(['csec_types', 'value']) || [],
    csecStartedAt: person.getIn(['csec_started_at', 'value']) || '',
    csecEndedAt: person.getIn(['csec_ended_at', 'value']) || '',
  })
}

export const getCSECRequireValidationSelector = (state, personId) => {
  const screeningReportType = state.getIn(['screeningInformationForm', 'report_type', 'value']) || ''
  const roles = state.getIn(['peopleForm', personId, 'roles', 'value']) || List()
  const csecDetails = selectCsec(state).get(personId) || List()
  if ((roles.includes('Victim') && screeningReportType === 'csec') || csecDetails.size > 0) {
    return true
  }
  return false
}

export const getErrorsSelector = (state, personId) => {
  const csecStartedAt = state.getIn(['peopleForm', personId, 'csec_started_at', 'value'])
  const csecEndedAt = state.getIn(['peopleForm', personId, 'csec_ended_at', 'value'])
  const csecTypes = state.getIn(['peopleForm', personId, 'csec_types', 'value'])
  return fromJS({
    csec_types: combineCompact(
      hasRequiredValuesCreate(csecTypes, 'CSEC type must be selected.')
    ),
    csec_ended_at: combineCompact(
      isFutureDatetimeCreate(csecEndedAt, 'The end date and time cannot be in the future.')
    ),
    csec_started_at: combineCompact(
      isRequiredCreate(csecStartedAt, 'Start date must be entered.'),
      isFutureDatetimeCreate(csecStartedAt, 'The start date and time cannot be in the future.'),
      isBeforeDatetimeCreate(
        csecEndedAt,
        csecStartedAt,
        'The start date and time must be before the end date and time.'
      )
    ),
  })
}

export const getTouchedFieldsForPersonSelector = (state, personId) => {
  const peopleForm = state.getIn(['peopleForm', personId], Map())
  return peopleForm.filter((field) => field.get('touched')).keySeq().toList()
}

export const getVisibleErrorsSelector = (state, personId) => {
  const touchedFields = getTouchedFieldsForPersonSelector(state, personId)
  const errors = getErrorsSelector(state, personId)
  return errors.reduce(
    (filteredErrors, fieldErrors, field) => (
      filteredErrors.set(field, touchedFields.includes(field) ? fieldErrors : List())
    ), Map())
}
