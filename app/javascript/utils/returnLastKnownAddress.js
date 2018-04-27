export const returnLastKnownAddress = (data) => {
  if (!data) { return null }
  return data
    .filter((address) => address.get('effective_start_date'))
    .sort((a, b) => new Date(b.get('effective_start_date')) - new Date(a.get('effective_start_date')))
    .first()
}
