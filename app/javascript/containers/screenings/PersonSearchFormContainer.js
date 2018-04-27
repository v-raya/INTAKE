import {connect} from 'react-redux'
import PersonSearchForm from 'views/people/PersonSearchForm'
import {getScreeningIdValueSelector} from 'selectors/screeningSelectors'
import {
  getPeopleResultsSelector,
  getResultsTotalValueSelector,
  getSearchTermValueSelector,
} from 'selectors/peopleSearchSelectors'
import {createPerson} from 'actions/personCardActions'
import {search, setSearchTerm, clear, loadMoreResults} from 'actions/peopleSearchActions'
import {canUserAddClient} from 'utils/authorization'

const isDuplicatePerson = (participants, personOnScreening) => (
  participants.some((x) => x.legacy_id === personOnScreening.legacy_descriptor.legacy_id)
)

const mapStateToProps = (state) => ({
  screeningId: getScreeningIdValueSelector(state),
  canCreateNewPerson: true,
  hasAddSensitivePerson: state.getIn(['staff', 'add_sensitive_people']),
  hasOverride: state.getIn(['staff', 'has_state_override']),
  results: getPeopleResultsSelector(state).toJS(),
  total: getResultsTotalValueSelector(state),
  searchPrompt: 'Search for any person (Children, parents, collaterals, reporters, alleged perpetrators...)',
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
    screeningId,
    userInfo,
    ...props
  } = stateProps
  const isSelectable = (person) => canUserAddClient(userInfo, hasAddSensitivePerson, person, hasOverride)
  const onSelect = (person) => {
    const personOnScreening = {
      screening_id: screeningId,
      legacy_descriptor: {
        legacy_id: person.legacyDescriptor && person.legacyDescriptor.legacy_id,
        legacy_source_table: person.legacyDescriptor && person.legacyDescriptor.legacy_table_name,
      },
    }
    actions.onClear()
    actions.onChange('')
    if (!isDuplicatePerson(stateProps.participants, personOnScreening)) {
      dispatch(createPerson(personOnScreening))
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
