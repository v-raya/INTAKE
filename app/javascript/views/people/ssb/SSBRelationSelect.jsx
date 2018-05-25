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
    <option key='PA' value='1592'>Parents</option>
    <option key='MO' value='1593'>Mother (Birth or Adoptive)</option>
    <option key='FA' value='1594'>Father (Birth or Adoptive)</option>
    <option key='GU' value='1595'>Legal Guardian</option>
    <option key='GP' value='1596'>Grandparents</option>
    <option key='GM' value='1597'>Grandmother</option>
    <option key='GF' value='1598'>Grandfather</option>
    <option key='SI' value='1599'>Sister</option>
    <option key='BR' value='1600'>Brother</option>
    <option key='SM' value='1601'>Stepmother</option>
    <option key='SF' value='1602'>Stepfather</option>
    <option key='AU' value='1603'>Aunt</option>
    <option key='UC' value='1604'>Uncle</option>
    <option key='OR' value='1605'>Other Relative</option>
    <option key='IC' value='1606'>Indian Custodian</option>
    <option key='NR' value='1607'>Nonrelative</option>
    <option key='UI' value='1608'>Unable to Identify</option>
  </SelectField>
)

SSBRelationSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

export default SSBRelationSelect
