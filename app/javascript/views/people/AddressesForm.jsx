import React from 'react'
import PropTypes from 'prop-types'
import InputField from 'common/InputField'
import SelectField from 'common/SelectField'
import {AddressPropType} from 'data/address'
import US_STATE from 'enums/USState'

const id = (idPrefix, index, field) => `${idPrefix}-address-${index}-${field}`

const AddressesForm = ({
  addAddress,
  addresses,
  addressTypeOptions,
  deleteAddress,
  idPrefix,
  onChange,
  onBlur,
}) => (
  <div>
    {addresses.map(({city, state, street, type, zip, zipError}, index) => (
      <div key={index} className='row list-item'>
        <InputField
          gridClassName='col-md-6'
          id={id(idPrefix, index, 'street')}
          label='Address'
          maxLength='128'
          onChange={({target: {value}}) => onChange(index, 'street', value)}
          value={street}
        />
        <InputField
          gridClassName='col-md-6'
          id={id(idPrefix, index, 'city')}
          label='City'
          maxLength='64'
          onChange={({target: {value}}) => onChange(index, 'city', value)}
          value={city}
        />
        <SelectField
          gridClassName='col-md-4'
          id={id(idPrefix, index, 'state')}
          label='State'
          onChange={({target: {value}}) => onChange(index, 'state', value)}
          value={state}
        >
          <option key='' value='' />
          {US_STATE.map(({code, name}) => <option key={code} value={code}>{name}</option>)}
        </SelectField>
        <InputField
          allowCharacters={/[0-9-]/}
          gridClassName='col-md-2'
          id={id(idPrefix, index, 'zip')}
          label='Zip'
          maxLength='5'
          onChange={({target: {value}}) => onChange(index, 'zip', value)}
          onBlur={() => onBlur(index, 'zip')}
          value={zip}
          errors={zipError}
        />
        <SelectField
          gridClassName='col-md-6'
          id={id(idPrefix, index, 'type')}
          label='Address Type'
          onChange={({target: {value}}) => onChange(index, 'type', value)}
          value={type}
        >
          <option key='' value='' />
          {addressTypeOptions.map(({label}) => <option key={label} value={label}>{label}</option>)}
        </SelectField>

        <a
          className='list-item__a'
          aria-label='Delete address'
          href='#/'
          onClick={(event) => {
            event.preventDefault()
            deleteAddress(index)
          }}
        >
          <i className='fa fa-times' />
        </a>
      </div>
    ))}
    <div className='row'>
      <div className='col-md-12'>
        <button
          className='btn btn-default btn-block'
          aria-label='Add address'
          onClick={addAddress}
        >
          <i className='fa fa-plus' />
          <span> Add new address</span>
        </button>
      </div>
    </div>
  </div>
)

AddressesForm.propTypes = {
  addAddress: PropTypes.func,
  addressTypeOptions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })),
  addresses: PropTypes.arrayOf(AddressPropType),
  deleteAddress: PropTypes.func,
  idPrefix: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
}

export default AddressesForm
