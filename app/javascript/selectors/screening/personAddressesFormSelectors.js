import {unwrap} from 'data/address'
import {List, Map} from 'immutable'
import {selectAddressTypes} from 'selectors/systemCodeSelectors'
import {getZIPErrors} from 'utils/zipValidator'

export const getAddresses = (person) => person.get('addresses', List()).map(unwrap)

export const getPersonEditableAddressesSelector = (state, personId) => getAddresses(state.get('peopleForm', Map()).get(personId))
  .filter((address) => !address.get('legacy_id'))
  .map((address) => address.delete('legacy_id').delete('legacy_descriptor'))
  .map((address) => address.set('zipError', getZIPErrors(address.get('zip'))))

export const getAddressTypeOptionsSelector = (state) => selectAddressTypes(state).map((addressType) => Map({
  label: addressType.get('value'),
}))
