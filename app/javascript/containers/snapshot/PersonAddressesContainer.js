import {connect} from 'react-redux'
import AddressesShow from 'views/people/AddressesShow'
import {selectFormattedAddresses} from 'selectors/participantSelectors'
import {sortAddressType} from 'utils/SortAddressTypes'

const mapStateToProps = (state, {personId}) => {
  const personAddresses = sortAddressType(selectFormattedAddresses(state, personId).toJS())
  return {addresses: personAddresses.length === 0 ? [{}] : personAddresses} // displays the label when the personAddresses array is empty
}

export default connect(mapStateToProps)(AddressesShow)
