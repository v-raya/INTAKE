import {List, Map} from 'immutable'
import {isReadWrite} from 'data/address'
import {selectAddressTypes} from 'selectors/systemCodeSelectors'
import {getZIPErrors} from 'utils/zipValidator'

const selectPlainAddresses = (person) => person.get('addresses', List())

export const selectAddresses = (person) => selectPlainAddresses(person)
  .map((address) => address.delete('touched'))

export const selectReadWriteAddresses = (state, personId) =>
  selectAddresses(state.get('peopleForm', Map()).get(personId))
    .filter(isReadWrite)
    .map((address) => address.delete('legacy_descriptor'))

export const selectAddressTypeOptions = (state) => selectAddressTypes(state)
  .map((addressType) => Map({
    label: addressType.get('value'),
  }))

export const selectReadWriteAddressesWithVisibleErrors = (state, personId) =>
  selectPlainAddresses(state.get('peopleForm', Map()).get(personId))
    .filter(isReadWrite)
    .map((address) => address
      .set('zipError', address.getIn(['touched', 'zip']) ? getZIPErrors(address.get('zip')) : List())
      .delete('legacy_descriptor')
      .delete('touched')
    )
