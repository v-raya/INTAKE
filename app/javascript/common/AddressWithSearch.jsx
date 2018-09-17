import React from 'react'
import PropTypes from 'prop-types'
import InputField from 'common/InputField'
import CountyNameSelect from 'common/county/CountyNameSelect'

const AddressWithSearch = ({
  onChangeAddress,
  onChangeCity,
  onChangeCounty,
  onSubmit,
  searchCounty,
}) => (
  <div className='row'>
    <CountyNameSelect
      id='search-county'
      gridClassName='col-md-3'
      onChange={onChangeCounty}
      value={searchCounty}
    />
    <InputField
      gridClassName='col-md-3'
      id='search-city'
      label='City'
      onChange={({target: {value}}) => onChangeCity(value)}
    />
    <InputField
      gridClassName='col-md-3'
      id='search-address'
      label='Address'
      onChange={({target: {value}}) => onChangeAddress(value)}
    />
    <div className='col-md-3 address-search'>
      <button className='btn btn-primary' onClick={onSubmit} >Search</button>
    </div>
  </div>
)

AddressWithSearch.propTypes = {
  onChangeAddress: PropTypes.func.isRequired,
  onChangeCity: PropTypes.func.isRequired,
  onChangeCounty: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  searchCounty: PropTypes.string,
}

AddressWithSearch.defaultProps = {
  searchCounty: '',
}

export default AddressWithSearch
