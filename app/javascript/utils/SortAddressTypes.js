export const sortAddressType = data => {
  const ordering = {}
  const sortOrder = [
    'Placement Home',
    'Residence',
    'Common',
    'Homeless',
    'Penal Institution',
    'Work',
    'Home',
    'Residence 2',
    'Day Care',
    'Other',
    'Permanent Mailing Address',
  ]
  for (let i = 0; i < sortOrder.length; i++) {
    ordering[sortOrder[i]] = i
  }
  const sortAddress = data.sort((a, b) => {
    return ordering[a.type] - ordering[b.type] || a.type && a.type.localeCompare(b.type)
  })
  return sortAddress
}
