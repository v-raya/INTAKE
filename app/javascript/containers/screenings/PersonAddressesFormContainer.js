import {connect} from 'react-redux'
import {setField, addAddress, deleteAddress, touchField} from 'actions/peopleFormActions'
import AddressesForm from 'views/people/AddressesForm'
import {
  getPersonEditableAddressesSelector,
  getAddressTypeOptionsSelector,
} from 'selectors/screening/personAddressesFormSelectors'

const mapStateToProps = (state, {personId}) => ({
  addresses: getPersonEditableAddressesSelector(state, personId).toJS(),
  addressTypeOptions: getAddressTypeOptionsSelector(state).toJS(),
  idPrefix: `person-${personId}`,
})

const mapDispatchToProps = (dispatch, {personId}) => ({
  addAddress: () => dispatch(addAddress(personId)),
  deleteAddress: (addressIndex) => dispatch(deleteAddress(personId, addressIndex)),
  onBlur: (field) => dispatch(touchField(personId, [field])),
  onChange: (addressIndex, field, value) => {
    dispatch(setField(personId, ['addresses', addressIndex, field], value))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(AddressesForm)
