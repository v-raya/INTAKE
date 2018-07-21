export const sortDateOfBirth = (a, b, order) => {
  var aDOB = a.dateOfBirth || new Date()
  var bDOB = b.dateOfBirth || new Date()
  var dateObject1 = new Date(aDOB)
  var dateObject2 = new Date(bDOB)
  if (order === 'desc') {
    return dateObject2 - dateObject1
  } else {
    return dateObject1 - dateObject2
  }
}
