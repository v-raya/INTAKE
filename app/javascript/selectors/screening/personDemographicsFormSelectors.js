import {fromJS, List, Map} from 'immutable'
import {ROLE_TYPE_NON_REPORTER} from 'enums/RoleType'
import {Maybe} from 'utils/maybe'

export const getIsApproximateAgeDisabledSelector = (state, personId) => (
  Boolean(state.getIn(['peopleForm', personId, 'date_of_birth', 'value']))
)

export const getPersonDemographicsSelector = (state, personId) => {
  const person = state.getIn(['peopleForm', personId], Map())
  return fromJS({
    approximateAge: person.getIn(['approximate_age', 'value']) || '',
    approximateAgeUnit: person.getIn(['approximate_age_units', 'value']) || '',
    dateOfBirth: person.getIn(['date_of_birth', 'value']) || '',
    gender: person.getIn(['gender', 'value']) || '',
    languages: person.getIn(['languages', 'value']) || [],
  })
}

const selectPerson = (state, id) => Maybe.of(state.getIn(['peopleForm', id]))

export const isGenderRequired = (state, personId) =>
  selectPerson(state, personId)
    .map((person) => person.getIn(['roles', 'value'], List()))
    .map((roles) => roles.some((role) => ROLE_TYPE_NON_REPORTER.includes(role)))
    .valueOrElse(false)
