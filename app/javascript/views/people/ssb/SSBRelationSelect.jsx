import PropTypes from 'prop-types'
import React from 'react'
import SelectField from 'common/SelectField'
import {RELATIONS} from 'enums/SafelySurrenderedBabyEnums'
import {optionsOf} from 'utils/enums'

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
    {optionsOf(RELATIONS)}
  </SelectField>
)

SSBRelationSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

export default SSBRelationSelect
