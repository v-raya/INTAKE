import React from 'react'
import PropTypes from 'prop-types'
import CheckboxField from 'common/CheckboxField'
import SelectField from 'common/SelectField'
import {ETHNICITY_DETAILS} from 'enums/Ethnicity'
import EthnicityCheckbox from 'views/people/EthnicityCheckbox'

const PersonEthnicityForm = ({
  disableFields,
  ethnicityDetail,
  latinoOrigin,
  onChange,
  personId,
}) => (
  <div className='gap-top' id='ethnicity'>
    <fieldset className='fieldset-inputs'>
      <legend className='legend-label'>Hispanic/Latino Origin</legend>
      <div className='row'>
        <div className='col-md-6'>
          <ul className='unstyled-list'>
            <li>
              <div className='half-gap-bottom'>
                <CheckboxField
                  id={`${personId}-ethnicity-yes`}
                  label='Yes'
                  value='Yes'
                  checked={latinoOrigin === 'Yes'}
                  disabled={disableFields && latinoOrigin !== 'Yes'}
                  onChange={({target: {checked}}) => {
                    if (checked) {
                      onChange('hispanic_latino_origin', 'Yes')
                    } else {
                      onChange('hispanic_latino_origin', null)
                      onChange('ethnicity_detail', [])
                    }
                  }}
                />
                {latinoOrigin === 'Yes' &&
                  <SelectField
                    id={`participant-${personId}-ethnicity-detail`}
                    label={''}
                    ariaLabel={`participant-${personId}-ethnicity-detail`}
                    value={ethnicityDetail || ''}
                    onChange={({target: {value}}) => onChange('ethnicity_detail', [value])}
                  >
                    <option key='' value='' />
                    {ETHNICITY_DETAILS.map((ethnicity) => <option key={ethnicity} value={ethnicity}>{ethnicity}</option>)}
                  </SelectField>
                }
              </div>
            </li>
            <li>
              <EthnicityCheckbox
                ethnicity='No'
                personId={personId}
                onChange={onChange}
                selectedEthnicity={latinoOrigin}
                disableFields={disableFields}
              />
            </li>
          </ul>
        </div>
        <div className='col-md-6'>
          <ul className='unstyled-list'>
            <li>
              <EthnicityCheckbox
                ethnicity='Unknown'
                personId={personId}
                onChange={onChange}
                selectedEthnicity={latinoOrigin}
                disableFields={disableFields}
              />
            </li>
            <li>
              <EthnicityCheckbox
                ethnicity='Abandoned'
                personId={personId}
                onChange={onChange}
                selectedEthnicity={latinoOrigin}
                disableFields={disableFields}
              />
            </li>
            <li>
              <EthnicityCheckbox
                ethnicity='Declined to answer'
                personId={personId}
                onChange={onChange}
                selectedEthnicity={latinoOrigin}
                disableFields={disableFields}
              />
            </li>
          </ul>
        </div>
      </div>
    </fieldset>
  </div>
)

PersonEthnicityForm.propTypes = {
  disableFields: PropTypes.bool,
  ethnicityDetail: PropTypes.string,
  latinoOrigin: PropTypes.string,
  onChange: PropTypes.func,
  personId: PropTypes.string,
}

export default PersonEthnicityForm
