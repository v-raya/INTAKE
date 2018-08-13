import {List, Map} from 'immutable'
import {isReadWrite, isReadOnly} from 'data/address'
import {selectAddressTypes} from 'selectors/systemCodeSelectors'
import {getZIPErrors} from 'utils/zipValidator'

export const selectAddresses = (person) => person
  .get('addresses', List())
  .map((address) => address.delete('touched'))

export const selectReadWriteAddresses = (state, personId) =>
  selectAddresses(state.get('peopleForm', Map()).get(personId))
    .filter(isReadWrite)
    .map((address) => address.delete('legacy_descriptor'))
    .map((address) => address.set('zipError', getZIPErrors(address.get('zip'))))

export const selectReadOnlyAddresses = (state, personId) =>
  selectAddresses(state.get('peopleForm', Map()).get(personId))
    .filter(isReadOnly)

export const selectAddressTypeOptions = (state) => selectAddressTypes(state)
  .map((addressType) => Map({
    label: addressType.get('value'),
  }))
