import {fromJS, List, Map} from 'immutable'
import {Maybe} from 'utils/maybe'
import {hasNonReporter} from 'utils/roles'

export const getIsApproximateAgeDisabledSelector = (state, personId) => (
  Boolean(state.getIn(['peopleForm', personId, 'date_of_birth', 'value']))
)

const selectGender = (person) => person.getIn(['gender', 'value']) || ''
const selectRoles = (person) => person.getIn(['roles', 'value']) || List()

export const isGenderRequired = hasNonReporter

const validateGender = (gender, roles) =>
  Maybe.of('Please select a Sex at Birth')
    .filter(() => gender === '' && isGenderRequired(roles))
    .valueOrElse()

export const getPersonDemographicsSelector = (state, personId) => {
  const person = state.getIn(['peopleForm', personId], Map())
  const gender = selectGender(person)
  const roles = selectRoles(person)
  return fromJS({
    approximateAge: person.getIn(['approximate_age', 'value']) || '',
    approximateAgeUnit: person.getIn(['approximate_age_units', 'value']) || '',
    dateOfBirth: person.getIn(['date_of_birth', 'value']) || '',
    gender,
    genderIsRequired: isGenderRequired(roles),
    genderError: validateGender(gender, roles),
    languages: person.getIn(['languages', 'value']) || [],
  })
}
