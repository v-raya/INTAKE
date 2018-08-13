import {connect} from 'react-redux'
import AddressesShow from 'views/people/AddressesShow'
import {selectAddresses} from 'selectors/participantSelectors'

const mapStateToProps = (state, {personId}) => (
  {addresses: selectAddresses(state, personId).toJS()}
)

export default connect(mapStateToProps)(AddressesShow)
