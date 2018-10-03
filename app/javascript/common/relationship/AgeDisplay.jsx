import React from 'react'
import PropTypes from 'prop-types'

const AgeDisplay = ({row}) => {
  const {age, dateOfBirth, estimatedDobCode} = row
  const ageDisplay = age === '' ? '' : `(${age})`
  switch (estimatedDobCode) {
    case 'N':
      return <div>{dateOfBirth} {ageDisplay}</div>
    case 'Y':
      return <div>{ageDisplay}</div>
    case 'U':
      return null
  }
  return null
}

AgeDisplay.propTypes = {
  row: PropTypes.shape({
    age: PropTypes.string,
    dateOfBirth: PropTypes.string,
    estimatedDobCode: PropTypes.string,
  }),
}
export default AgeDisplay
