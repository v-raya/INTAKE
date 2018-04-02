import {connect} from 'react-redux'
import {Relationships} from 'common/Relationships'
import {getPeopleSelector} from 'selectors/screening/relationshipsSelectors'
import {createSnapshotPerson} from 'actions/personCardActions'
import {getSnapshotIdValueSelector} from 'selectors/snapshotSelectors'

const mapStateToProps = (state, _ownProps) => ({
  people: getPeopleSelector(state).toJS(),
  snapshotId: getSnapshotIdValueSelector(state),
  isScreening: false,
})

const mapDispatchToProps = (dispatch) => ({
  onClick: (relationship) => {
    const id = relationship.legacy_descriptor && relationship.legacy_descriptor.legacy_id
    dispatch(createSnapshotPerson(id))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Relationships)
