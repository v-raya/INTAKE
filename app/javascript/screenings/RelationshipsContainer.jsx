import {connect} from 'react-redux'
import {Relationships} from 'common/Relationships'
import {getPeopleSelector, getRelationshipsButtonStatus} from 'selectors/screening/relationshipsSelectors'
import {createPerson} from 'actions/personCardActions'
import {
  loadRelationship,
  setRelationshipForm,
  updateRelationship,
} from 'actions/relationshipFormActions'
import {getScreeningIdValueSelector} from 'selectors/screeningSelectors'
import {
  selectIsFormNoChangeState,
  selectRelationship,
} from 'selectors/screening/relationshipFormSelectors'

const mapStateToProps = (state, _ownProps) => ({
  editFormRelationship: selectRelationship(state).toJS(),
  people: getPeopleSelector(state).toJS(),
  screeningId: getScreeningIdValueSelector(state),
  isFormChanged: selectIsFormNoChangeState(state),
  isScreening: true,
  pendingPeople: state.get('pendingParticipants').toJS(),
  relationshipsButtonStatus: getRelationshipsButtonStatus(state).toJS(),
})

export const mapDispatchToProps = (dispatch) => ({
  onClick: (relationship, screeningId) => {
    const relationshipsPerson = {
      screening_id: screeningId,
      legacy_descriptor: {
        legacy_id: relationship.legacy_descriptor && relationship.legacy_descriptor.legacy_id,
        legacy_source_table: relationship.legacy_descriptor && relationship.legacy_descriptor.legacy_table_name,
      },
    }
    dispatch(createPerson(relationshipsPerson))
  },
  onChange: ((field, value) => dispatch(setRelationshipForm(field, value))),
  onEdit: (person, relationship) => dispatch(loadRelationship(person, relationship)),
  onSave: (id) => dispatch(updateRelationship(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Relationships)
