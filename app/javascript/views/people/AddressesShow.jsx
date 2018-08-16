import React from 'react'
import PropTypes from 'prop-types'
import ShowField from 'common/ShowField'
import {AddressPropType} from 'data/address'

const AddressesShow = ({addresses}) => (
  <div>
    {addresses.map(({city, state, street, type, zip, zipError}, index) => (

      <div key={index}>
        <div className='row gap-top'>
          <ShowField gridClassName='col-md-6' label='Address'>{street}</ShowField>
          <ShowField gridClassName='col-md-6' label='City'>{city}</ShowField>
        </div>
        <div className='row gap-top'>
          <ShowField gridClassName='col-md-4' label='State'>{state}</ShowField>
          <ShowField gridClassName='col-md-2' label='Zip' errors={zipError}>{zip}</ShowField>
          <ShowField gridClassName='col-md-6' label='Address Type'>{type}</ShowField>
        </div>
      </div>
    ))}
  </div>
)

AddressesShow.propTypes = {
  addresses: PropTypes.arrayOf(AddressPropType),
}

export default AddressesShow
