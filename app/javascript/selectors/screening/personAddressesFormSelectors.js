import {List, Map} from 'immutable'
import {isReadWrite, setVisibleErrors} from 'data/address'
import {selectAddressTypes} from 'selectors/systemCodeSelectors'

export const selectAddresses = (person) => person.get('addresses', List())

const selectAddressesById = (state, personId) =>
  selectAddresses(state.get('peopleForm', Map()).get(personId))

const selectReadWriteAddressesById = (state, personId) =>
  selectAddressesById(state, personId)
    .filter(isReadWrite)

export const selectReadWriteAddresses = (state, personId) =>
  selectReadWriteAddressesById(state, personId)
    .map((address) => address.delete('legacy_descriptor'))

export const selectAddressTypeOptions = (state) => selectAddressTypes(state)
  .map((addressType) => Map({label: addressType.get('value')}))

export const selectReadWriteAddressesWithVisibleErrors = (state, personId) =>
  selectReadWriteAddressesById(state, personId)
    .map(setVisibleErrors)
    .map((address) => address.delete('legacy_descriptor').delete('touched'))
