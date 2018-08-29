import {connect} from 'react-redux'
import ScreeningCreateRelationship from 'views/ScreeningCreateRelationship'
import {selectCandidates} from 'selectors/screening/candidateSelectors'

const mapStateToProps = (state, {personId}) => ({
  candidates: selectCandidates(state, personId).toJS(),
})

export default connect(mapStateToProps, {})(ScreeningCreateRelationship)
