import {createSelector} from 'reselect'
import {List} from 'immutable'
import {selectParticipants} from 'selectors/participantSelectors'
import {ROLE_TYPE_REPORTER} from 'enums/RoleType'

export const selectParticipantsRoles = (state) => (
  selectParticipants(state).map((participant) => participant.get('roles', List())).flatten()
)

export const isReporterRequired = (decision, roles) => (
  (decision === 'information_to_child_welfare_services' &&
    !roles.some((role) => ROLE_TYPE_REPORTER.includes(role))) ?
    'A reporter is required to submit a screening Contact' : undefined
)

export const selectCasesAndReferrals = createSelector(
  (state) => state.getIn(['involvements', 'cases'], List()),
  (state) => state.getIn(['involvements', 'referrals'], List()),
  (cases, referrals) => (cases.concat(referrals))
)

export const validateScreeningContactReference = (casesAndReferrals, contactReference, decision) => (
  (decision === 'information_to_child_welfare_services' &&
    !casesAndReferrals.find((hoiItem) => !hoiItem.get('end_date') &&
      hoiItem.getIn(['legacy_descriptor', 'legacy_ui_id']) === contactReference
    )) ? 'Please enter a valid Case or Referral Id' : undefined
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
