import ClassNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import CheckboxField from 'common/CheckboxField'
import SelectField from 'common/SelectField'
import ErrorMessages from 'common/ErrorMessages'
import {AGENCY_TYPES} from 'enums/CrossReport'

const CrossReportAgencyField = ({
  actions: {
    clearAllAgencyFields,
    setAgencyTypeField,
    setAgencyField,
    touchAgencyField,
    touchField,
  },
  errors,
  type,
  countyAgencies,
  required,
  selected,
  value,
}) => (
  <div>
    <CheckboxField
      id={`type-${type}`}
      checked={selected}
      disabled={countyAgencies.length === 0}
      label={AGENCY_TYPES[type]}
      onChange={({target: {checked}}) => {
        setAgencyTypeField(type, checked)
        touchField(type)
        if (checked) {
          const agency = value || (countyAgencies[0] && countyAgencies[0].id)
          setAgencyField(type, agency)
          touchAgencyField(type)
        } else {
          clearAllAgencyFields(type)
        }
      }}
      required={required}
      value={type}
    />
    {
      selected &&
        <SelectField
          id={`${type}-agency-code`}
          label={`${AGENCY_TYPES[type]} Agency Name`}
          gridClassName={ClassNames({'input-error': (errors && errors.length !== 0)})}
          required
          onChange={({target: {value}}) => {
            setAgencyField(type, value)
            touchAgencyField(type)
          }}
          onBlur={() => touchAgencyField(type)}
          value={value}
        >
          {countyAgencies.map((agency) => <option key={agency.id} value={agency.id}>{agency.name}</option>)}
        </SelectField>
    }
    <ErrorMessages errors={errors} />
  </div>
)
CrossReportAgencyField.propTypes = {
  actions: PropTypes.object.isRequired,
  countyAgencies: PropTypes.array.isRequired,
  errors: PropTypes.array,
  required: PropTypes.bool,
  selected: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

export default CrossReportAgencyField
