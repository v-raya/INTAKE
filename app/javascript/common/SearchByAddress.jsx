import React from 'react'
import PropTypes from 'prop-types'
import CheckboxField from 'common/CheckboxField'
import AddressWithSearch from 'common/AddressWithSearch'

const SearchByAddress = ({searchAddress, includeAddressClicked}) => (
  <div>
    <CheckboxField
      id='include-address'
      label='Include Address'
      onChange={includeAddressClicked}
    />
    {searchAddress && <AddressWithSearch />}
  </div>
)

SearchByAddress.propTypes = {
  includeAddressClicked: PropTypes.func,
  searchAddress: PropTypes.bool,
}

export default SearchByAddress
