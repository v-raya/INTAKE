import React from 'react'
import PropTypes from 'prop-types'
import InputField from 'common/InputField'

const AddressWithSearch = ({submitButtonClicked}) => (
  <div className='row'>
    <InputField
      gridClassName='col-md-3'
      id='search-address'
      label='Address'
    />
    <div className='col-md-3'>
      <label>&nbsp;</label>
      <button className='btn btn-primary' onClick={submitButtonClicked} >Search</button>
    </div>
  </div>
)

AddressWithSearch.propTypes = {
  submitButtonClicked: PropTypes.func,
}

export default AddressWithSearch
