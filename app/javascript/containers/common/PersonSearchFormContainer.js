import {connect} from 'react-redux'
import PersonSearchForm from 'views/people/PersonSearchForm'
import {selectParticipants} from 'selectors/participantSelectors'
import {
  getPeopleResultsSelector,
  getResultsTotalValueSelector,
  getSearchTermValueSelector,
  getStartTimeSelector,
} from 'selectors/peopleSearchSelectors'
import {search, setSearchTerm, clear, loadMoreResults} from 'actions/peopleSearchActions'
import {canUserAddClient} from 'utils/authorization'
import {getStaffIdSelector} from 'selectors/userInfoSelectors'

const mapStateToProps = (state) => {
  const userInfo = state.get('userInfo').toJS()
  const hasAddSensitivePerson = state.getIn(['staff', 'add_sensitive_people'])
  const hasOverride = state.getIn(['staff', 'has_state_override'])
  const isSelectable = (person) => canUserAddClient(userInfo, hasAddSensitivePerson, person, hasOverride)

  return {
    results: getPeopleResultsSelector(state).toJS(),
    total: getResultsTotalValueSelector(state),
    searchTerm: getSearchTermValueSelector(state),
    staffId: getStaffIdSelector(state),
    startTime: getStartTimeSelector(state),
    participants: selectParticipants(state).toJS(),
    isSelectable,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const onClear = () => dispatch(clear())
  const onChange = (value) => dispatch(setSearchTerm(value))
  const onSearch = (value) => dispatch(search(value, ownProps.isClientOnly))
  const onLoadMoreResults = () => dispatch(loadMoreResults(ownProps.isClientOnly))
  return {
    onSearch,
    onClear,
    onChange,
    onLoadMoreResults,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonSearchForm)
