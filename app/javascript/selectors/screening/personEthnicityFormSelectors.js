export const getAreEthnicityFieldsDisabledForPersonSelector = (state, personId) => (
  Boolean(state.getIn(['peopleForm', personId, 'ethnicity', 'hispanic_latino_origin', 'value']))
)

export const getPersonHispanicLatinoOriginValueSelector = (state, personId) => (
  state.getIn(['peopleForm', personId, 'ethnicity', 'hispanic_latino_origin', 'value'])
)

export const getPersonEthnicityDetailValueSelector = (state, personId) => (
  state.getIn(['peopleForm', personId, 'ethnicity', 'ethnicity_detail', 'value', 0])
)
