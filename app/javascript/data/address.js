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
  legacy_descriptor,
}) => fromJS({
  touched: {},
  id,
  street: street_address,
  city,
  state,
  zip,
  type,
  legacy_descriptor: legacy_descriptor || null,
})

export const isReadWrite = (address) => !address.getIn(['legacy_descriptor', 'legacy_id'])
export const isReadOnly = (address) => Boolean(address.getIn(['legacy_descriptor', 'legacy_id']))

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

export const plainToFerb = (address) => address
  .set('street_address', address.get('street'))
  .delete('street')
  .filterNot((value, key) => key === 'legacy_descriptor' && value === null)
