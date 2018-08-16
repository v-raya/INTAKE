import {createSelector} from 'reselect'
import {Map, List, fromJS} from 'immutable'
import {selectParticipants, selectParticipantsForFerb} from 'selectors/participantSelectors'
import {getScreeningSelector, getScreeningIdValueSelector} from 'selectors/screeningSelectors'
import {getAllegationsWithTypesSelector} from 'selectors/screening/allegationsTypeFormSelectors'
import nameFormatter from 'utils/nameFormatter'
import {siblingAtRiskHasRequiredComplementaryAllegations} from 'utils/allegationsHelper'
import ALLEGATION_TYPES from 'enums/AllegationTypes'
import _ from 'lodash'
const FLATTEN_LEVEL = 1
const sortFields = [(person) => (person.date_of_birth || ''), 'last_name', 'first_name']
const sortOrder = ['desc', 'asc', 'asc']

const getAllegationsFormSelector = (state) => state.get('allegationsForm', List())
export const getAllegationTypesSelector = () => (
  fromJS(ALLEGATION_TYPES.map((type) => ({label: type.value, value: type.value})))
)

export const getSortedVictimsSelector = createSelector(
  selectParticipants,
  (people) => (fromJS(
    _.orderBy(
      people.filter((person) => person.get('roles', List()).includes('Victim')).toJS(),
      sortFields,
      sortOrder
    )
  ))
)

export const getSortedPerpetratorsSelector = createSelector(
  selectParticipants,
  (people) => (fromJS(
    _.orderBy(
      people.filter((person) => person.get('roles', List()).includes('Perpetrator')).toJS(),
      sortFields,
      sortOrder
    )
  ))
)

const getAllegationsToSaveSelector = createSelector(
  getAllegationsWithTypesSelector,
  getScreeningIdValueSelector,
  (allegations, screeningId) => allegations.map((allegation) => Map({
    id: allegation.get('id'),
    screening_id: screeningId,
    victim_person_id: allegation.get('victimId'),
    perpetrator_person_id: allegation.get('perpetratorId'),
    types: allegation.get('allegationTypes'),
  }))
)

export const getScreeningWithAllegationsEditsSelector = createSelector(
  getScreeningSelector,
  getAllegationsToSaveSelector,
  selectParticipantsForFerb,
  (screening, allegations, participants) => screening
    .set('allegations', allegations)
    .set('participants', participants)
)

export const getFormattedAllegationsSelector = createSelector(
  getSortedVictimsSelector,
  getSortedPerpetratorsSelector,
  getAllegationsFormSelector,
  (victims, perpetrators, allegations) => (
    victims.map((victim) => {
      const filterPerpetrator = perpetrators.filterNot((perpetrator) => victim.get('id') === perpetrator.get('id'))
      if (filterPerpetrator.size === 0) {
        const victimId = victim.get('id')
        const allegationTypes = allegations.find((allegation) => (allegation.get('victimId') === victimId
        ), null, Map()).get('allegationTypes') || List()
        return fromJS([{
          victimName: nameFormatter(victim.toJS()),
          victimId,
          allegationTypes,
        }])
      }
      return filterPerpetrator.map((perpetrator, index) => {
        const victimId = victim.get('id')
        const perpetratorId = perpetrator.get('id')
        const allegationTypes = allegations.find((allegation) => (
          allegation.get('victimId') === victimId && allegation.get('perpetratorId') === perpetratorId
        ), null, Map()).get('allegationTypes') || List()
        return fromJS({
          victimName: index === 0 ? nameFormatter(victim.toJS()) : '',
          victimId,
          perpetratorName: nameFormatter(perpetrator.toJS()),
          perpetratorId,
          allegationTypes,
        })
      })
    })
  ).flatten(FLATTEN_LEVEL)
)

export const getAllegationsRequiredValueSelector = (state) => (
  state.getIn(['screeningDecisionForm', 'screening_decision', 'value']) === 'promote_to_referral'
)

export const getAllegationsAlertErrorMessageSelector = (state) => {
  const required = getAllegationsRequiredValueSelector(state)
  const allegations = getAllegationsFormSelector(state)
  const allegationsWithTypes = getAllegationsWithTypesSelector(state)
  if (!siblingAtRiskHasRequiredComplementaryAllegations(allegations)) {
    return 'Any allegations of Sibling at Risk must be accompanied by another allegation.'
  } else if (required && allegationsWithTypes.isEmpty()) {
    return 'Any report that is promoted for referral must include at least one allegation.'
  } else {
    return undefined
  }
}
