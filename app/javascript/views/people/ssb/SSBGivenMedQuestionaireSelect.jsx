import PropTypes from 'prop-types'
import React from 'react'
import SelectField from 'common/SelectField'
import {GIVEN_MED_QUESTIONAIRE_RESPONSES} from 'enums/SafelySurrenderedBabyEnums'
import {optionsOf} from 'utils/enums'

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
    {optionsOf(GIVEN_MED_QUESTIONAIRE_RESPONSES)}
  </SelectField>
)

SSBGivenMedQuestionaireSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

export default SSBGivenMedQuestionaireSelect
