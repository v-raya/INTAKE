import {fromJS, Set} from 'immutable'
import PropTypes from 'prop-types'
import US_STATE from 'enums/USState'
import {getZIPErrors} from 'utils/zipValidator'

export const AddressPropType = PropTypes.shape({
  city: PropTypes.string,
  state: PropTypes.string,
  street: PropTypes.string,
  type: PropTypes.string,
  zip: PropTypes.string,
  zipError: PropTypes.arrayOf(PropTypes.string),
})

const keySet = Set(['id', 'street', 'city', 'state', 'zip', 'type', 'legacy_descriptor'])
const isKeyValid = (_value, key) => keySet.has(key)

export const ferbToPlain = (ferbAddress) =>
  ferbAddress
    .set('street', ferbAddress.get('street_address'))
    .update('legacy_descriptor', (value) => (value || null))
    .filter(isKeyValid)

export const addressFromFerb = ({
  id,
  street_address,
  city,
  state,
  zip,
  type,
  legacy_id,
  legacy_descriptor,
}) => fromJS({
  id,
  street: {touched: false, value: street_address},
  city: {touched: false, value: city},
  state: {touched: false, value: state},
  zip: {touched: false, value: zip},
  type: {touched: false, value: type},
  legacy_id: {touched: false, value: legacy_id},
  legacy_descriptor: {touched: false, value: legacy_descriptor},
})

export const isReadWrite = (address) => !address.getIn(['legacy_id', 'value'])
export const isReadOnly = (address) => Boolean(address.getIn(['legacy_id', 'value']))

const getValue = (wrapped) => wrapped.get('value')

export const unwrap = (address) => address
  .update('street', getValue)
  .update('city', getValue)
  .update('state', getValue)
  .update('zip', getValue)
  .update('type', getValue)
  .update('legacy_id', getValue)
  .update('legacy_descriptor', getValue)

const formatState = (stateCode) => {
  const state = US_STATE.find((state) => state.code === stateCode)
  return state ? state.name : ''
}

export const formatForDisplay = (address) => address
  .update('state', formatState)
  .set('legacy_id', address.getIn(['legacy_descriptor', 'legacy_id']))
  .set('zipError', address.getIn(['legacy_descriptor', 'legacy_id']) ?
    null : getZIPErrors(address.get('zip')))
  .delete('id')
  .delete('legacy_descriptor')
