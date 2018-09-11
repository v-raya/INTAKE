import React from 'react'
import PropTypes from 'prop-types'
import InputField from 'common/InputField'
import CountyNameSelect from 'common/county/CountyNameSelect'

const AddressWithSearch = ({onSubmit}) => (
  <div className='row'>
    <CountyNameSelect
      id='search-county'
      gridClassName='col-md-3'
      onChange={console.log}
      value='Sacramento'
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
}

export default AddressWithSearch
