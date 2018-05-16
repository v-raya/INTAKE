import {Map} from 'immutable'
import {RACE_DETAILS} from 'enums/Races'

export const getPersonRacesSelector = (state, personId) => {
  const personRaces = state.getIn(['peopleForm', personId, 'races'])
  return Object.keys(RACE_DETAILS).reduce((races, race) => races.set(race, personRaces.getIn([race, 'value'], false)), Map())
}
export const getPersonRaceDetailsSelector = (state, personId) => {
  const personRaces = state.getIn(['peopleForm', personId, 'race_details'])
  return Object.keys(RACE_DETAILS).reduce((races, race) => races.set(race, personRaces.getIn([race, 'value'], '')), Map())
}
export const getIsRaceIndeterminateValueSelector = (state, personId) => {
  const isUnknown = state.getIn(['peopleForm', personId, 'races', 'Unknown', 'value'])
  const isAbandoned = state.getIn(['peopleForm', personId, 'races', 'Abandoned', 'value'])
  const isDeclinedToAnswer = state.getIn(['peopleForm', personId, 'races', 'Declined to answer', 'value'])

  return Boolean(isUnknown || isAbandoned || isDeclinedToAnswer)
}
