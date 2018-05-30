export const SET_SSB_FIELD = 'SET_SSB_FIELD'

export const setField = (field, value) => ({
  type: SET_SSB_FIELD,
  payload: {field, value},
})
