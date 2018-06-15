import {createSelector} from 'reselect'
import {List} from 'immutable'
import {ROLE_TYPE_REPORTER} from 'enums/RoleType'

const hasReporter = (roles) =>
  roles.some((role) => ROLE_TYPE_REPORTER.includes(role))

export const isReporterRequired = (decision, roles) => {
  if (hasReporter(roles)) { return undefined }

  if (decision === 'information_to_child_welfare_services') {
    return 'A reporter is required to submit a screening Contact'
  }
  if (decision === 'promote_to_referral') {
    return 'A reporter is required to promote to referral'
  }
  return undefined
}
export const selectCasesAndReferrals = createSelector(
  (state) => state.getIn(['involvements', 'cases'], List()),
  (state) => state.getIn(['involvements', 'referrals'], List()),
  (cases, referrals) => (cases.concat(referrals))
)

export const validateScreeningContactReference = (casesAndReferrals, contactReference, decision) => (
  (decision === 'information_to_child_welfare_services' &&
    casesAndReferrals.every((hoiItem) => hoiItem.get('end_date') ||
      hoiItem.getIn(['legacy_descriptor', 'legacy_ui_id']) !== contactReference)) ?
    'Please enter a valid Case or Referral Id' : undefined
)

export const validateScreeningDecisionDetail = (decision, decisionDetail) => (
  (decision === 'promote_to_referral' && !decisionDetail) ?
    'Please enter a response time' : undefined
)

export const validateAllegations = (decision, allegations) => (
  (decision === 'promote_to_referral' &&
          allegations.every((allegation) => allegation.get('allegationTypes').isEmpty())) ?
    'Please enter at least one allegation to promote to referral.' : undefined
)
