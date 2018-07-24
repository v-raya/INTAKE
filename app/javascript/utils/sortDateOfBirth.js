const SORT_DOWN = 1
const SORT_UP = -1

export const sortDateOfBirth = (a, b, order) => {
  if (a.dateOfBirth === '' && b.dateOfBirth === '') {
    return 0
  }
  if (order === 'desc') {
    if (a.dateOfBirth === '') {
      return SORT_DOWN
    }
    if (b.dateOfBirth === '') {
      return SORT_UP
    }
  } else {
    if (a.dateOfBirth === '') {
      return SORT_UP
    }
    if (b.dateOfBirth === '') {
      return SORT_DOWN
    }
  }
  const dateObject1 = new Date(a.dateOfBirth)
  const dateObject2 = new Date(b.dateOfBirth)
  return (order === 'desc') ? dateObject2 - dateObject1 : dateObject1 - dateObject2
}
