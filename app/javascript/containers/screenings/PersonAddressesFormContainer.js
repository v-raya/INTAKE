import {connect} from 'react-redux'
import {
  setAddressField,
  addAddress,
  deleteAddress,
  touchAddressField,
} from 'actions/peopleFormActions'
import AddressesForm from 'views/people/AddressesForm'
import {
  selectReadWriteAddressesWithVisibleErrors,
  selectAddressTypeOptions,
} from 'selectors/screening/personAddressesFormSelectors'

const mapStateToProps = (state, {personId}) => ({
  addresses: selectReadWriteAddressesWithVisibleErrors(state, personId).toJS(),
  addressTypeOptions: selectAddressTypeOptions(state).toJS(),
  idPrefix: `person-${personId}`,
})

const mapDispatchToProps = (dispatch, {personId}) => ({
  addAddress: () => dispatch(addAddress(personId)),
  deleteAddress: (addressIndex) => dispatch(deleteAddress(personId, addressIndex)),
  onBlur: (addressIndex, field) => dispatch(touchAddressField(personId, addressIndex, field)),
  onChange: (addressIndex, field, value) => {
    dispatch(setAddressField(personId, addressIndex, field, value))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(AddressesForm)
