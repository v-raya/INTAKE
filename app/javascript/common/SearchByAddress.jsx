import React from 'react'
import PropTypes from 'prop-types'
import CheckboxField from 'common/CheckboxField'
import AddressWithSearch from 'common/AddressWithSearch'

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
}) => (
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
)

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
