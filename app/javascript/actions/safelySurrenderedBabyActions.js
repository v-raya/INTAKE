export const SET_SSB_FIELD = 'SET_SSB_FIELD'
export const GENERATE_BABY_DOE = 'GENERATE_BABY_DOE'

export const setField = (field, value) => ({
  type: SET_SSB_FIELD,
  payload: {field, value},
})

export const generateBabyDoe = (screeningId) => ({
  type: GENERATE_BABY_DOE,
  payload: screeningId,
})
