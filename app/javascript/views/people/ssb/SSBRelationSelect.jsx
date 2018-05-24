import PropTypes from 'prop-types'
import React from 'react'
import SelectField from 'common/SelectField'

const SSBRelationSelect = ({
  value,
  onChange,
}) => (
  <SelectField
    gridClassName='col-md-4'
    id='relation-to-child'
    label='Relationship to Surrendered Child'
    value={value}
    onChange={onChange}
  >
    <option key='fake-a' value='Hagrid'>Fake Value A</option>
    <option key='fake-b' value='fake-b'>Fake Value B</option>
  </SelectField>
)

SSBRelationSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

export default SSBRelationSelect
