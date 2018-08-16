import {createSelector} from 'reselect'
import {Map, List, fromJS} from 'immutable'
import {getScreeningSelector} from 'selectors/screeningSelectors'
import {isRequiredIfCreate, isRequiredCreate, combineCompact} from 'utils/validator'
import SCREENING_DECISION from 'enums/ScreeningDecision'
import ACCESS_RESTRICTIONS from 'enums/AccessRestrictions'
import SCREENING_DECISION_OPTIONS from 'enums/ScreeningDecisionOptions'
import {selectParticipantsForFerb, selectAllRoles} from 'selectors/participantSelectors'
import {getAllegationsWithTypesSelector} from 'selectors/screening/allegationsTypeFormSelectors'
import {
  validateReporterRequired,
  selectCasesAndReferrals,
  validateScreeningContactReference,
  validateAllegations,
  validateScreeningDecisionDetail,
} from 'selectors/screening/decisionSelectors'

const selectOptionsFormatter = (options) => (
  Object.entries(options).map(([key, value]) => ({value: key, label: value}))
)
export const getDecisionFormSelector = (state) => state.get('screeningDecisionForm', Map())

export const getDecisionOptionListSelector = () => fromJS(selectOptionsFormatter(SCREENING_DECISION))

export const getDecisionOptionsSelector = createSelector(
  selectCasesAndReferrals,
  getDecisionOptionListSelector,
  (casesAndReferrals, options) => {
    const hasOpenItem = casesAndReferrals.some((k) => !k.get('end_date'))
    return hasOpenItem ? options : options.filter((obj) => obj.get('value') !== 'information_to_child_welfare_services')
  }
)

export const selectContactReferenceValue = (state) => state.getIn(['screeningDecisionForm', 'screening_contact_reference', 'value'])

export const getAccessRestrictionOptionsSelector = () => fromJS(selectOptionsFormatter(ACCESS_RESTRICTIONS))

export const getDecisionValueSelector = (state) => (
  state.getIn(['screeningDecisionForm', 'screening_decision', 'value'])
)

export const getDecisionDetailValueSelector = (state) => (
  state.getIn(['screeningDecisionForm', 'screening_decision_detail', 'value'])
)

export const getDecisionDetailOptionsSelector = createSelector(
  (state) => state.getIn(['screeningDecisionForm', 'screening_decision', 'value'], ''),
  (decision) => {
    const options = SCREENING_DECISION_OPTIONS[decision] && SCREENING_DECISION_OPTIONS[decision].values
    if (options) {
      return fromJS(selectOptionsFormatter(options))
    } else {
      return List()
    }
  }
)

export const getErrorsSelector = createSelector(
  getDecisionValueSelector,
  getDecisionDetailValueSelector,
  (state) => state.getIn(['screeningDecisionForm', 'restrictions_rationale', 'value']) || '',
  (state) => state.get('allegationsForm', List()),
  selectAllRoles,
  (state) => state.getIn(['screeningDecisionForm', 'additional_information', 'value']) || '',
  selectContactReferenceValue,
  selectCasesAndReferrals,
  (decision, decisionDetail, restrictionsRationale, allegations, roles, additionalInformation, contactReference, casesAndReferrals) => fromJS({
    screening_decision: combineCompact(
      isRequiredCreate(decision, 'Please enter a decision'),
      () => validateAllegations(decision, allegations),
      () => validateReporterRequired(decision, roles).valueOrElse()
    ),
    screening_contact_reference: combineCompact(
      () => validateScreeningContactReference(casesAndReferrals, contactReference, decision)
    ),
    screening_decision_detail: combineCompact(
      () => validateScreeningDecisionDetail(decision, decisionDetail)
    ),
    additional_information: combineCompact(
      isRequiredIfCreate(additionalInformation, 'Please enter additional information', () => (
        decision === 'screen_out' && decisionDetail === 'evaluate_out'
      ))
    ),
    restrictions_rationale: combineCompact(
      isRequiredCreate(restrictionsRationale, 'Please enter an access restriction reason')
    ),
  })
)

const getTouchedFieldsSelector = createSelector(
  getDecisionFormSelector,
  (decisionForm) => decisionForm.filter((field) => field.get('touched')).keySeq().toList()
)

export const getVisibleErrorsSelector = createSelector(
  getErrorsSelector,
  getTouchedFieldsSelector,
  (errors, touchedFields) => errors.reduce(
    (filteredErrors, fieldErrors, field) => {
      if (touchedFields.includes(field)) {
        return filteredErrors.set(field, fieldErrors)
      } else {
        return filteredErrors.set(field, List())
      }
    },
    Map()
  )
)

export const selectContactReference = createSelector(
  (state) => state.getIn(['screeningDecisionForm', 'screening_decision', 'value'], ''),
  selectContactReferenceValue,
  (state) => getVisibleErrorsSelector(state).get('screening_contact_reference'),
  (decision, value, errors) => {
    const required = true
    const field = Map({required, value: value || '', errors})
    return decision === 'information_to_child_welfare_services' ? field : Map()
  }
)

export const getDecisionDetailSelector = createSelector(
  getDecisionValueSelector,
  getDecisionDetailValueSelector,
  (state) => getVisibleErrorsSelector(state).get('screening_decision_detail'),
  (decision, value, errors) => {
    const required = decision === 'promote_to_referral'
    const label = SCREENING_DECISION_OPTIONS[decision] && SCREENING_DECISION_OPTIONS[decision].label || ''
    return Map({label: label, required, value: value || '', errors})
  }
)

export const getDecisionSelector = createSelector(
  getDecisionValueSelector,
  (state) => getVisibleErrorsSelector(state).get('screening_decision'),
  (value, errors) => Map({value, errors})
)

export const getAdditionalInfoRequiredSelector = createSelector(
  getDecisionValueSelector,
  getDecisionDetailValueSelector,
  (decision, decisionDetail) => (decision && decision === 'screen_out' && decisionDetail && decisionDetail === 'evaluate_out')
)

export const getAdditionalInformationSelector = createSelector(
  (state) => state.getIn(['screeningDecisionForm', 'additional_information', 'value']),
  (state) => getVisibleErrorsSelector(state).get('additional_information'),
  (value, errors) => Map({value: value || '', errors})
)

export const getAccessRestrictionSelector = createSelector(
  (state) => state.getIn(['screeningDecisionForm', 'access_restrictions', 'value']),
  (value) => Map({value: value || ''})
)

export const getRestrictionRationaleSelector = createSelector(
  (state) => state.getIn(['screeningDecisionForm', 'restrictions_rationale', 'value']),
  (state) => getVisibleErrorsSelector(state).get('restrictions_rationale'),
  (value, errors) => Map({value: value || '', errors})
)

export const getScreeningWithEditsSelector = createSelector(
  getScreeningSelector,
  getDecisionValueSelector,
  getDecisionDetailValueSelector,
  selectContactReferenceValue,
  (state) => state.getIn(['screeningDecisionForm', 'additional_information', 'value']),
  (state) => state.getIn(['screeningDecisionForm', 'access_restrictions', 'value']),
  (state) => state.getIn(['screeningDecisionForm', 'restrictions_rationale', 'value']),
  selectParticipantsForFerb,
  (screening, decision, decisionDetail, contactReference, additionalInformation, accessRestriction, restrictionRationale, participants) => (
    screening.set('screening_decision', decision)
      .set('screening_decision_detail', decisionDetail)
      .set('additional_information', additionalInformation)
      .set('screening_contact_reference', contactReference)
      .set('access_restrictions', accessRestriction)
      .set('restrictions_rationale', restrictionRationale)
      .set('participants', participants)
  )
)

export const isAllegationsProhibited = (state) => (
  state.getIn(['screeningDecisionForm', 'screening_decision', 'value']) === 'information_to_child_welfare_services'
)

export const getDecisionAlertErrorMessageSelector = (state) => {
  const required = isAllegationsProhibited(state)
  const allegationsWithTypes = getAllegationsWithTypesSelector(state)
  if (required && !allegationsWithTypes.isEmpty()) {
    return 'Please remove any allegations before submitting this information to a social worker on an existing case or referral.'
  } else {
    return undefined
  }
}
