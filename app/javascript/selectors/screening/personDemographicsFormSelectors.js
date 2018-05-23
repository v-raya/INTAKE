import {fromJS, Map} from 'immutable'

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
