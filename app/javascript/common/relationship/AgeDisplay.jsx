import React from 'react'
import PropTypes from 'prop-types'

const AgeDisplay = ({row}) => {
  const {age, dateOfBirth, estimated_dob_code} = row
  switch (estimated_dob_code) {
    case 'N':
      return <div>{dateOfBirth || ''} {age === '' ? '' : `(${age})`}</div>
    case 'Y':
      return <div>{age === '' ? '' : `(${age})`}</div>
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
