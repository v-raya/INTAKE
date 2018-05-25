export const FETCH_SSB_COMPLETE = 'FETCH_SSB_COMPLETE'
export const SAVE_SSB_FIELD = 'SAVE_SSB_FIELD'

export const fetchSSBSuccess = (payload) => ({
  type: FETCH_SSB_COMPLETE,
  payload,
})

export const fetchSSBFailure = (error) => ({
  type: FETCH_SSB_COMPLETE,
  payload: {error},
  error: true,
})

export const saveField = (field, value) => ({
  type: SAVE_SSB_FIELD,
  payload: {field, value},
})
