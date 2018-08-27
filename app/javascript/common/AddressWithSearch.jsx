import React from 'react'
import InputField from 'common/InputField'

const AddressWithSearch = () => (
  <div className='row'>
    <InputField
      gridClassName='col-md-3'
      id='search-address'
      label='Address'
    />
    <div className='col-md-3'>
      <label>&nbsp;</label>
      <button className='btn btn-primary'>Search</button>
    </div>
  </div>
)

export default AddressWithSearch
