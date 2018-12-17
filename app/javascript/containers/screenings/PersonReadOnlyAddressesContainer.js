import {connect} from 'react-redux'
import AddressesShow from 'views/people/AddressesShow'
import {getReadOnlyPersonFormattedAddressesSelector} from 'selectors/screening/personShowSelectors'

const mapStateToProps = (state, {personId}) => (
  {addresses: getReadOnlyPersonFormattedAddressesSelector(state, personId).toJS()}
)

export default connect(mapStateToProps)(AddressesShow)
