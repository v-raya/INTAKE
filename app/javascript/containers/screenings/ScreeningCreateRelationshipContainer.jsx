import {connect} from 'react-redux'
import ScreeningCreateRelationship from 'views/ScreeningCreateRelationship'
import {selectCandidates} from 'selectors/screening/candidateSelectors'
import {setFieldCandidate} from 'actions/relationshipsActions'

const mapStateToProps = (state, {personId}) => ({
  candidates: selectCandidates(state, personId).toJS(),
})

const mapDispatchToProps = (dispatch) => ({
  onChange: ((personId, candidateId, fieldSet, value) =>
    dispatch(setFieldCandidate(personId, candidateId, fieldSet, value))),
})

export default connect(mapStateToProps, mapDispatchToProps)(ScreeningCreateRelationship)
