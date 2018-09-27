import {connect} from 'react-redux'
import PersonSearchForm from 'views/people/PersonSearchForm'
import {selectParticipants} from 'selectors/participantSelectors'
import {
  selectPeopleResults,
  selectResultsTotalValue,
  selectSearchTermValue,
  selectSearchAddressValue,
  selectStartTime,
  selectSearchAddress,
  selectSearchCity,
  selectSearchCounty,
} from 'selectors/peopleSearchSelectors'
import {
  search,
  setSearchTerm,
  setSearchAddress,
  setSearchCity,
  setSearchCounty,
  clear,
  loadMoreResults,
  toggleAddressSearch,
  resetAddressSearch,
} from 'actions/peopleSearchActions'
import {canUserAddClient} from 'utils/authorization'
import {getStaffIdSelector} from 'selectors/userInfoSelectors'

const mapStateToProps = (state) => {
  const userInfo = state.get('userInfo').toJS()
  const hasAddSensitivePerson = state.getIn(['staff', 'add_sensitive_people'])
  const hasOverride = state.getIn(['staff', 'has_state_override'])
  const isSelectable = (person) => canUserAddClient(userInfo, hasAddSensitivePerson, person, hasOverride)

  return {
    results: selectPeopleResults(state).toJS(),
    total: selectResultsTotalValue(state),
    searchTerm: selectSearchTermValue(state),
    searchAddress: selectSearchAddress(state),
    searchCity: selectSearchCity(state),
    searchCounty: selectSearchCounty(state),
    isAddressIncluded: selectSearchAddressValue(state),
    staffId: getStaffIdSelector(state),
    startTime: selectStartTime(state),
    participants: selectParticipants(state).toJS(),
    isSelectable,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const onClear = () => dispatch(clear())
  const onChange = (value) => dispatch(setSearchTerm(value))
  const onChangeAddress = (value) => dispatch(setSearchAddress(value))
  const onChangeCity = (value) => dispatch(setSearchCity(value))
  const onChangeCounty = (value) => dispatch(setSearchCounty(value))
  const onResetAddressSearch = () => dispatch(resetAddressSearch())
  const onSearch = (value, address) => dispatch(search(value, ownProps.isClientOnly, address))
  const onLoadMoreResults = (address) => dispatch(loadMoreResults(ownProps.isClientOnly, address))
  const onToggleAddressSearch = () => dispatch(toggleAddressSearch())
  return {
    onSearch,
    onClear,
    onChange,
    onChangeAddress,
    onChangeCity,
    onChangeCounty,
    onLoadMoreResults,
    onToggleAddressSearch,
    onResetAddressSearch,
    dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonSearchForm)
