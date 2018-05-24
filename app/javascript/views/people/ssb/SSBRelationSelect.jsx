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
    <option key='PA' value='50'>Parents</option>
    <option key='MO' value='100'>Mother (Birth or Adoptive)</option>
    <option key='FA' value='150'>Father (Birth or Adoptive)</option>
    <option key='GU' value='200'>Legal Guardian</option>
    <option key='GP' value='250'>Grandparents</option>
    <option key='GM' value='300'>Grandmother</option>
    <option key='GF' value='350'>Grandfather</option>
    <option key='SI' value='400'>Sister</option>
    <option key='BR' value='450'>Brother</option>
    <option key='SM' value='500'>Stepmother</option>
    <option key='SF' value='550'>Stepfather</option>
    <option key='AU' value='600'>Aunt</option>
    <option key='UC' value='650'>Uncle</option>
    <option key='OR' value='700'>Other Relative</option>
    <option key='IC' value='750'>Indian Custodian</option>
    <option key='NR' value='800'>Nonrelative</option>
    <option key='UI' value='850'>Unable to Identify</option>
  </SelectField>
)

SSBRelationSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

export default SSBRelationSelect
