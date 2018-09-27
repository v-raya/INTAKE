import PropTypes from 'prop-types'
import React from 'react'
import CheckboxField from 'common/CheckboxField'

const EthnicityCheckbox = ({
  disableFields,
  ethnicity,
  personId,
  selectedEthnicity,
  onChange,
}) => (
  <CheckboxField
    id={`${personId}-ethnicity-${ethnicity.toLowerCase().replace(/ /g, '-')}`}
    label={ethnicity}
    value={ethnicity}
    checked={selectedEthnicity === ethnicity}
    disabled={disableFields && selectedEthnicity !== ethnicity}
    onChange={({target: {checked}}) => {
      if (checked) {
        onChange('hispanic_latino_origin', ethnicity)
      } else {
        onChange('hispanic_latino_origin', null)
      }
    }}
  />
)

EthnicityCheckbox.propTypes = {
  disableFields: PropTypes.bool,
  ethnicity: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  personId: PropTypes.string,
  selectedEthnicity: PropTypes.string,
}

export default EthnicityCheckbox
