import {Set, Map, List} from 'immutable'
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

const defaultToNull = (value) => (value || null)

export const fromFerbAddress = (ferbAddress) =>
  ferbAddress
    .set('street', ferbAddress.get('street_address'))
    .update('id', defaultToNull)
    .update('legacy_descriptor', defaultToNull)
    .filter(isKeyValid)

export const toFerbAddress = (address) => address
  .set('street_address', address.get('street'))
  .delete('street')
  .delete('touched')
  .filterNot((value, key) => key === 'legacy_descriptor' && value === null)

export const setTouchable = (address) => address.set('touched', Map())

export const isReadOnly = (address) => Boolean(address.getIn(['legacy_descriptor', 'legacy_id']))
export const isReadWrite = (address) => !isReadOnly(address)

const formatState = (stateCode) => {
  const state = US_STATE.find((state) => state.code === stateCode)
  return state ? state.name : ''
}

export const expandState = (address) => address.update('state', formatState)

export const setErrors = (address) => address
  .set('zipError', isReadWrite(address) ? getZIPErrors(address.get('zip')) : null)

export const setVisibleErrors = (address) => address.set(
  'zipError',
  address.getIn(['touched', 'zip']) ? getZIPErrors(address.get('zip')) : List()
)
