export const FETCH_SSB_COMPLETE = 'FETCH_SSB_COMPLETE'
export const SET_SSB_FIELD = 'SET_SSB_FIELD'

export const fetchSSBSuccess = (payload) => ({
  type: FETCH_SSB_COMPLETE,
  payload,
})

export const fetchSSBFailure = (error) => ({
  type: FETCH_SSB_COMPLETE,
  payload: {error},
  error: true,
})

export const setField = (field, value) => ({
  type: SET_SSB_FIELD,
  payload: {field, value},
})
