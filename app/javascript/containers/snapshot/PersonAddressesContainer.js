import {connect} from 'react-redux'
import AddressesShow from 'views/people/AddressesShow'
import {getAllPersonFormattedAddressesSelector} from 'selectors/screening/personShowSelectors'

const mapStateToProps = (state, {personId}) => (
  {addresses: getAllPersonFormattedAddressesSelector(state, personId).toJS()}
)

export default connect(mapStateToProps)(AddressesShow)
