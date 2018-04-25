export const returnLastKnowAddress = (data) => {
  if (data) {
    const legacyLastUpdated = ['legacy_descriptor', 'legacy_last_updated']
    return (
      data.reduce((latest, current) => (!latest || current.getIn(legacyLastUpdated) >
      latest.getIn(legacyLastUpdated) ? current : latest))
    )
  } else {
    return null
  }
}