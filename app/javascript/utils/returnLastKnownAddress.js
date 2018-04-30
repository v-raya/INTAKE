export const returnLastKnownAddress = (data) => {
  if (!data) { return null }
  return data
    .filter((address) => address.getIn(['type', 'description']) === 'Residence')
    .first()
}
