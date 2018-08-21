import DateField from 'common/DateField'
import InlineHeader from 'common/InlineHeader'
import PropTypes from 'prop-types'
import React from 'react'
import Select from 'react-select'
import CSEC_TYPES from 'enums/CSECTypes'
import ErrorMessages from 'common/ErrorMessages'
import {systemCodeIdValue} from 'selectors/systemCodeSelectors'

const PersonCSECForm = ({
  CSECTypes,
  csecStartedAt,
  csecEndedAt,
  errors,
  onBlur,
  onChange,
  personId,
  showCSEC,
  csecTypes,
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
              options={CSEC_TYPES.map((csec_type) => ({value: systemCodeIdValue(csec_type, csecTypes), label: csec_type}))}
              value={CSECTypes}
              onBlur={() => onBlur('csec_types')}
              onChange={(values) => onChange('csec_types', values.map(({value}) => value))}
            />
            {<ErrorMessages ariaDescribedBy={`csec_types_${personId}`} errors={errors.csec_types}/>}
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
  csecTypes: PropTypes.object,
  errors: PropTypes.object,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  personId: PropTypes.string,
  showCSEC: PropTypes.bool,
}
export default PersonCSECForm
