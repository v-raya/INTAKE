export const getSafelySurrenderedBaby = (state, personId) =>
  state.find((value, key) =>
    key === 'safelySurrenderedBaby' &&
    value &&
    value.get('participant_child_id') === personId
  )
