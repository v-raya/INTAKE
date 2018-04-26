export const returnLastKnownAddress = (data) => {
  if (data) {
    return (
      data.reduce((latest, current) => {
        if (current.has('effective_start_date')) {
          if (latest) {
            return current.get('effective_start_date') > latest.get('effective_start_date') ? current : latest
          }
          return current
        }
        return latest
      }, null)
    )
  }
  return null
}
