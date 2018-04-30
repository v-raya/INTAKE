import {connect} from 'react-redux'
import PersonSearchForm from 'views/people/PersonSearchForm'
import {
  getPeopleResultsSelector,
  getResultsTotalValueSelector,
  getSearchTermValueSelector,
} from 'selectors/peopleSearchSelectors'
import {createSnapshotPerson} from 'actions/personCardActions'
import {search, setSearchTerm, clear, loadMoreResults} from 'actions/peopleSearchActions'
import {canUserAddClient} from 'utils/authorization'

const isDuplicatePerson = (participants, id) => (
  participants.some((x) => x.legacy_id === id)
)

const mapStateToProps = (state) => ({
  canCreateNewPerson: false,
  hasAddSensitivePerson: state.getIn(['staff', 'add_sensitive_people']),
  hasOverride: state.getIn(['staff', 'has_state_override']),
  results: getPeopleResultsSelector(state).toJS(),
  total: getResultsTotalValueSelector(state),
  searchPrompt: 'Search for clients',
  searchTerm: getSearchTermValueSelector(state),
  participants: state.get('participants').toJS(),
  userInfo: state.get('userInfo').toJS(),
})

const mapDispatchToProps = (dispatch, _ownProps) => {
  const onClear = () => dispatch(clear())
  const onChange = (value) => dispatch(setSearchTerm(value))
  const onSearch = (value) => dispatch(search(value))
  const onLoadMoreResults = () => dispatch(loadMoreResults())
  return {
    onSearch,
    onClear,
    onChange,
    onLoadMoreResults,
    dispatch,
  }
}

const mergeProps = (stateProps, {dispatch, ...actions}) => {
  const {
    hasAddSensitivePerson,
    hasOverride,
    userInfo,
    ...props
  } = stateProps
  const isSelectable = (person) => canUserAddClient(userInfo, hasAddSensitivePerson, person, hasOverride)
  const onSelect = (person) => {
    const id = person.legacyDescriptor && person.legacyDescriptor.legacy_id
    actions.onClear()
    actions.onChange('')
    if (!isDuplicatePerson(stateProps.participants, id)) {
      dispatch(createSnapshotPerson(id))
    }
  }
  return {
    ...actions,
    ...props,
    isSelectable,
    onSelect,
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PersonSearchForm)
