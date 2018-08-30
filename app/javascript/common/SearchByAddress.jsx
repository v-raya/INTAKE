import React from 'react'
import PropTypes from 'prop-types'
import CheckboxField from 'common/CheckboxField'
import AddressWithSearch from 'common/AddressWithSearch'

const SearchByAddress = ({searchAddress, includeAddressClicked, submitButtonClicked}) => (
  <div>
    <div className='row'>
      <div className='col-md-3'>
        <CheckboxField
          id='include-address'
          label='Include Address'
          onChange={includeAddressClicked}
          value={searchAddress}
        />
      </div>
    </div>
    {searchAddress && <AddressWithSearch submitButtonClicked={submitButtonClicked} />}
  </div>
)

SearchByAddress.propTypes = {
  includeAddressClicked: PropTypes.func,
  searchAddress: PropTypes.bool,
  submitButtonClicked: PropTypes.func,
}

export default SearchByAddress
