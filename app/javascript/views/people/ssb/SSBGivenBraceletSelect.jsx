import PropTypes from 'prop-types'
import React from 'react'
import SelectField from 'common/SelectField'

const SSBGivenBraceletSelect = ({
  value,
  onChange,
}) => (
  <SelectField
    gridClassName='col-md-4'
    id='pg-given-bracelet-id'
    label='Parent/Guardian Given Bracelet ID'
    value={value}
    onChange={onChange}
  >
    <option key='unknown' value='unknown'>Unknown</option>
    <option key='yes' value='yes'>Yes</option>
    <option key='no' value='no'>No</option>
    <option key='attempted' value='attempted'>Attempted</option>
  </SelectField>
)

SSBGivenBraceletSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

export default SSBGivenBraceletSelect
