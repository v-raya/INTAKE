import {connect} from 'react-redux'
import {setField, addPhone, deletePhone, touchPhoneNumberField} from 'actions/peopleFormActions'
import PhoneNumbersForm from 'views/people/PhoneNumbersForm'
import {
  getPersonPhoneNumbersSelector,
  getPhoneNumberTypeOptions,
} from 'selectors/screening/personPhoneNumbersFormSelectors'

const mapStateToProps = (state, {personId}) => (
  {
    phoneNumbers: getPersonPhoneNumbersSelector(state, personId).toJS(),
    phoneTypes: getPhoneNumberTypeOptions().toJS(),
  }
)

const mapDispatchToProps = (dispatch, {personId}) => ({
  addPhone: () => dispatch(addPhone(personId)),
  deletePhone: (phoneIndex) => dispatch(deletePhone(personId, phoneIndex)),
  onBlur: (phoneIndex, field) => dispatch(touchPhoneNumberField(personId, phoneIndex, field)),
  onChange: (phoneIndex, field, value) => {
    dispatch(setField(personId, ['phone_numbers', phoneIndex, field], value))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(PhoneNumbersForm)
