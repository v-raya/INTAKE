import DateField from 'common/DateField'
import InlineHeader from 'common/InlineHeader'
import PropTypes from 'prop-types'
import React from 'react'
import Select from 'react-select'
import CSEC_TYPES from 'enums/CSECTypes'

const PersonCSECForm = ({
  CSECTypes,
  csecStartedAt,
  csecEndedAt,
  errors,
  onBlur,
  onChange,
  personId,
  showCSEC,
}) => (
  <div>
    {showCSEC &&
      <div>
        <div className='row'>
          <InlineHeader heading='CSEC Information' />
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <label htmlFor={`csec_types_${personId}`}>CSEC Types</label>
            <Select
              multi
              tabSelectsValue={false}
              inputProps={{id: `csec_types_${personId}`}}
              options={CSEC_TYPES.map((csec_type) => ({value: csec_type, label: csec_type}))}
              value={CSECTypes}
              onChange={(values) => onChange('csec_types', values.map(({value}) => value))}
            />
          </div>
          <DateField
            gridClassName='col-md-3'
            id='csec_started_at'
            label='CSEC Start Date'
            hasTime={false}
            required
            value={csecStartedAt}
            errors={errors.csec_started_at}
            onBlur={() => onBlur('csec_started_at')}
            onChange={(value) => onChange('csec_started_at', value)}
          />
          <DateField
            gridClassName='col-md-3'
            id='csec_ended_at'
            label='CSEC End Date'
            hasTime={false}
            value={csecEndedAt}
            errors={errors.csec_ended_at}
            onBlur={() => onBlur('csec_ended_at')}
            onChange={(value) => onChange('csec_ended_at', value)}
          />
        </div>
      </div>
    }
  </div>
)
PersonCSECForm.propTypes = {
  CSECTypes: PropTypes.array,
  csecEndedAt: PropTypes.string,
  csecStartedAt: PropTypes.string,
  errors: PropTypes.object,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  personId: PropTypes.string,
  showCSEC: PropTypes.bool,
}
export default PersonCSECForm
