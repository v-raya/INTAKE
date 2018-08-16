import {connect} from 'react-redux'
import AddressesShow from 'views/people/AddressesShow'
import {selectFormattedAddresses} from 'selectors/participantSelectors'

const mapStateToProps = (state, {personId}) => (
  {addresses: selectFormattedAddresses(state, personId).toJS()}
)

export default connect(mapStateToProps)(AddressesShow)
