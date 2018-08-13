import {unwrap} from 'data/address'
import {List, Map} from 'immutable'
import {selectAddressTypes} from 'selectors/systemCodeSelectors'
import {getZIPErrors} from 'utils/zipValidator'

export const selectAddresses = (person) =>
  person.get('addresses', List()).map(unwrap)

export const selectReadWriteAddresses = (state, personId) =>
  selectAddresses(state.get('peopleForm', Map()).get(personId))
    .filter((address) => !address.get('legacy_id'))
    .map((address) => address.delete('legacy_id').delete('legacy_descriptor'))
    .map((address) => address.set('zipError', getZIPErrors(address.get('zip'))))

export const selectAddressTypeOptions = (state) => selectAddressTypes(state)
  .map((addressType) => Map({
    label: addressType.get('value'),
  }))
