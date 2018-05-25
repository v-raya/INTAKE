export const FETCH_SSB_COMPLETE = 'FETCH_SSB_COMPLETE'
export const SET_SSB_FIELD = 'SET_SSB_FIELD'
export const SAVE_SSB = 'SAVE_SSB'
export const SAVE_SSB_COMPLETE = 'SAVE_SSB_COMPLETE'

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

export const saveSSB = (personId) => ({
  type: SAVE_SSB,
  payload: {personId},
})

export const saveSSBSuccess = (payload) => ({
  type: SAVE_SSB_COMPLETE,
  payload,
})

export const saveSSBFailure = (error) => ({
  type: SAVE_SSB_COMPLETE,
  payload: {error},
  error: true,
})
