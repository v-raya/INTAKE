import PropTypes from 'prop-types'
import React from 'react'
import SelectField from 'common/SelectField'

const SSBGivenMedQuestionaireSelect = ({
  value,
  onChange,
}) => (
  <SelectField
    gridClassName='col-md-4'
    id='pg-provided-medical-questionaire'
    label='Parent/Guardian Provided Medical Questionaire'
    value={value}
    onChange={onChange}
  >
    <option key='unknown' value='unknown'>Unknown</option>
    <option key='immediate' value='immediate'>Completed and Returned Immediately</option>
    <option key='mailed' value='mailed'>Completed and Mailed Back</option>
    <option key='provided' value='provided'>Provided/Never Returned</option>
    <option key='declined' value='declined'>Declined</option>
  </SelectField>
)

SSBGivenMedQuestionaireSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

export default SSBGivenMedQuestionaireSelect
