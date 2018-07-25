const SORT_DOWN = 1
const SORT_UP = -1

export const sortDateOfBirth = (a, b, order) => {
  if (a.dateOfBirth === '' && b.dateOfBirth === '') {
    return 0
  } else if (a.dateOfBirth === '' && order === 'asc') {
    return SORT_UP
  } else if (b.dateOfBirth === '' && order === 'asc') {
    return SORT_DOWN
  } else if (a.dateOfBirth === '' && order === 'desc') {
    return SORT_DOWN
  } else if (b.dateOfBirth === '' && order === 'desc') {
    return SORT_UP
  }
  const dateObject1 = new Date(a.dateOfBirth)
  const dateObject2 = new Date(b.dateOfBirth)
  return (order === 'desc') ? dateObject2 - dateObject1 : dateObject1 - dateObject2
}
