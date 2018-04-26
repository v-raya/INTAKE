export const returnLastKnownAddress = (data) => {
  if (data) {
    return (
      data.reduce((latest, current) => (!latest || current.get('effective_start_date') >
      latest.get('effective_start_date') ? current : latest))
    )
  }
  return null
}
