import {connect} from 'react-redux'
import RelationshipsCard from 'common/RelationshipsCard'
import {getPeopleSelector} from 'selectors/screening/relationshipsSelectors'

const mapStateToProps = (state, _ownProps) => ({
  areRelationshipsEmpty: getPeopleSelector(state).isEmpty(),
  isScreening: true,
})

export default connect(mapStateToProps)(RelationshipsCard)
