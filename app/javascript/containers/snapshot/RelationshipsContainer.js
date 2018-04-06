import {connect} from 'react-redux'
import {Relationships} from 'common/Relationships'
import {getPeopleSelector} from 'selectors/screening/relationshipsSelectors'
import {createSnapshotPerson} from 'actions/personCardActions'

const mapStateToProps = (state, _ownProps) => ({
  people: getPeopleSelector(state).toJS(),
  isScreening: false,
  pendingPeople: state.get('pendingParticipants').toJS(),
})

const delayed = 400
const mapDispatchToProps = (dispatch) => ({
  onClick: (relationship) => {
    const id = relationship.legacy_descriptor && relationship.legacy_descriptor.legacy_id
    dispatch(createSnapshotPerson(id, delayed))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Relationships)
