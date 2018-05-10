export const isPlacementHome = (address) => {
  if (!address) { return null }
  return (address.getIn(['legacy_descriptor', 'legacy_table_name']) === 'PLC_HM_T') ? 'Placement Home' : false
}
