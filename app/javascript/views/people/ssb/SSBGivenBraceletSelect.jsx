import PropTypes from 'prop-types'
import React from 'react'
import SelectField from 'common/SelectField'
import {GIVEN_BRACELET_RESPONSES} from 'enums/SafelySurrenderedBabyEnums'
import {optionsOf} from 'utils/enums'

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
    {optionsOf(GIVEN_BRACELET_RESPONSES)}
  </SelectField>
)

SSBGivenBraceletSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

export default SSBGivenBraceletSelect
