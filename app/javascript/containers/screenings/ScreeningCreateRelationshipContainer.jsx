import {connect} from 'react-redux'
import ScreeningCreateRelationship from 'views/ScreeningCreateRelationship'
import {
  selectCandidates,
  selectisDisabledForm,
} from 'selectors/screening/candidateSelectors'
import {
  batchCreateRelationships,
  setFieldCandidate,
  resetFieldCandidate,
} from 'actions/relationshipsActions'

const mapStateToProps = (state, {personId}) => ({
  candidates: selectCandidates(state, personId).toJS(),
  isDisabled: selectisDisabledForm(state),
})

export const mapDispatchToProps = (dispatch) => ({
  onChange: ((personId, candidateId, fieldSet, value) =>
    dispatch(setFieldCandidate(personId, candidateId, fieldSet, value))),
  onCancel: ((personId) => dispatch(resetFieldCandidate(personId))),
  onSave: (personId) => dispatch(batchCreateRelationships(personId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ScreeningCreateRelationship)
