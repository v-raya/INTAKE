import DateField from 'common/DateField'
import InlineHeader from 'common/InlineHeader'
import InputField from 'common/InputField'
import APPROXIMATE_AGE_UNITS from 'enums/ApproximateAgeUnits'
import GENDERS from 'enums/Genders'
import LANGUAGES from 'enums/Languages'
import PropTypes from 'prop-types'
import React from 'react'
import Select from 'react-select'
import SelectField from 'common/SelectField'

const id = (personId, field) => `person-${personId}-${field}`

const PersonDemographicsForm = ({
  approximateAge,
  approximateAgeIsDisabled,
  approximateAgeUnit,
  dateOfBirth,
  dateOfBirthIsRequired,
  dobError,
  gender,
  genderError,
  genderIsRequired,
  languages,
  onChange,
  personId,
}) => (
  <div>
    <div className='row'>
      <InlineHeader heading='Demographic Information' />
    </div>
    <div className='row'>
      <DateField
        gridClassName='col-md-3 date-field-alignment-correction'
        id={id(personId, 'date-of-birth')}
        label='Date of birth'
        hasTime={false}
        value={dateOfBirth}
        required={dateOfBirthIsRequired}
        onChange={(value) => onChange('date_of_birth', value)}
        errors={dobError}
      />
      <div className='col-md-1 text-between-inputs'>or</div>
      <InputField
        gridClassName='col-md-3'
        id={id(personId, 'approximate-age')}
        label='Approximate Age'
        allowCharacters={/[0-9]/}
        maxLength='3'
        value={approximateAge}
        required={dateOfBirthIsRequired}
        onChange={({target: {value}}) => onChange('approximate_age', value)}
        disabled={approximateAgeIsDisabled}
      />
      <div className='col-md-2 input-no-header'>
        <select
          id={id(personId, 'approximate-age-units')}
          aria-label='Approximate Age Units'
          value={approximateAgeUnit}
          onChange={({target: {value}}) => onChange('approximate_age_units', value)}
          disabled={approximateAgeIsDisabled}
        >
          <option key='' value='' />
          {Object.keys(APPROXIMATE_AGE_UNITS).map((unit) => <option key={unit} value={unit}>{APPROXIMATE_AGE_UNITS[unit]}</option>)}
        </select>
      </div>
      <SelectField
        gridClassName='col-md-3'
        id={id(personId, 'sex-at-birth')}
        label='Sex at Birth'
        value={gender}
        onChange={({target: {value}}) => onChange('gender', value)}
        required={genderIsRequired}
        errors={genderError ? [genderError] : []}
      >
        <option key='' value='' />
        {Object.keys(GENDERS).map((gender) => <option key={gender} value={gender}>{GENDERS[gender]}</option>)}
      </SelectField>
    </div>
    <div className='row'>
      <div className='col-md-12'>
        <label htmlFor={id(personId, 'languages')}>Language(s) (Primary First)</label>
        <Select
          multi
          tabSelectsValue={false}
          inputProps={{id: id(personId, 'languages')}}
          options={LANGUAGES.map((language) => ({value: language, label: language}))}
          value={languages}
          onChange={(languages) => onChange('languages', languages)}
        />
      </div>
    </div>
  </div>
)
PersonDemographicsForm.propTypes = {
  approximateAge: PropTypes.string,
  approximateAgeIsDisabled: PropTypes.bool,
  approximateAgeUnit: PropTypes.string,
  dateOfBirth: PropTypes.string,
  dateOfBirthIsRequired: PropTypes.bool,
  dobError: PropTypes.array,
  gender: PropTypes.string,
  genderError: PropTypes.string,
  genderIsRequired: PropTypes.bool.isRequired,
  languages: PropTypes.array,
  onChange: PropTypes.func,
  personId: PropTypes.string,
}
export default PersonDemographicsForm
