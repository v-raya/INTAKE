import React from 'react'
import PropTypes from 'prop-types'
import InputField from 'common/InputField'
import CountyNameSelect from 'common/county/CountyNameSelect'

const AddressWithSearch = ({onSubmit, searchCounty}) => (
  <div className='row'>
    <CountyNameSelect
      id='search-county'
      gridClassName='col-md-3'
      onChange={console.log}
      value={searchCounty}
    />
    <InputField
      gridClassName='col-md-3'
      id='search-address'
      label='Address'
      onChange={() => {}}
    />
    <div className='col-md-3 address-search'>
      <button className='btn btn-primary' onClick={onSubmit} >Search</button>
    </div>
  </div>
)

AddressWithSearch.propTypes = {
  onSubmit: PropTypes.func,
  searchCounty: PropTypes.string,
}

AddressWithSearch.defaultProps = {
  searchCounty: '',
}

export default AddressWithSearch
