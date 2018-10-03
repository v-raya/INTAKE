import React from 'react'
import PropTypes from 'prop-types'

const AgeDisplay = ({row}) => {
  const {age, dateOfBirth, estimated_dob_code} = row
  const ageDisplay = age === '' ? '' : `(${age})`
  switch (estimated_dob_code) {
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
    estimated_dob_code: PropTypes.string,
  }),
}
export default AgeDisplay
