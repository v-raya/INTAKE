import {connect} from 'react-redux'
import PhoneNumbersShow from 'views/people/PhoneNumbersShow'
import {getPersonFormattedPhoneNumbersSelector} from 'selectors/screening/personShowSelectors'

const mapStateToProps = (state, {personId}) => {
  const result = getPersonFormattedPhoneNumbersSelector(state, personId).toJS()
  return {phoneNumbers: result.length === 0 ? [{}] : result}
}

export default connect(mapStateToProps)(PhoneNumbersShow)
