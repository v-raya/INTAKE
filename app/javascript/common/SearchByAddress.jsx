import React from 'react'
import PropTypes from 'prop-types'
import CheckboxField from 'common/CheckboxField'
import AddressWithSearch from 'common/AddressWithSearch'
import {isConfigOptionTrue} from './config'

export function isHotline(location) {
  return location.pathname.indexOf('/screenings') >= 0
}
const isSearchByAddressOn = (location) => {
  return isHotline(location)
      ? isConfigOptionTrue('address_search_hotline')
      : isConfigOptionTrue('address_search_snapshot')
}

const SearchByAddress = ({
  isAddressIncluded,
  toggleAddressSearch,
  onChangeAddress,
  onChangeCity,
  onChangeCounty,
  onSubmit,
  searchAddress,
  searchCity,
  searchCounty,
  searchTerm,
  location,
}) => isSearchByAddressOn(location) ? (
  <div>
    <div className='row'>
      <div className='col-md-3'>
        <CheckboxField
          id='include-address'
          label='Include Address'
          onChange={toggleAddressSearch}
          value='include-address'
        />
      </div>
    </div>
    {
      isAddressIncluded &&
      <AddressWithSearch
        onChangeAddress={onChangeAddress}
        onChangeCity={onChangeCity}
        onChangeCounty={onChangeCounty}
        onSubmit={onSubmit}
        searchAddress={searchAddress}
        searchCity={searchCity}
        searchCounty={searchCounty}
        searchTerm={searchTerm}
      />
    }
  </div>
) : ''

SearchByAddress.propTypes = {
  isAddressIncluded: PropTypes.bool,
  onChangeAddress: PropTypes.func.isRequired,
  onChangeCity: PropTypes.func.isRequired,
  onChangeCounty: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  searchAddress: PropTypes.string,
  searchCity: PropTypes.string,
  searchCounty: PropTypes.string,
  searchTerm: PropTypes.string,
  toggleAddressSearch: PropTypes.func,
}

export default SearchByAddress
