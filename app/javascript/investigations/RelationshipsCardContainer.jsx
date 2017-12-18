import {connect} from 'react-redux'
import RelationshipsCard from 'investigations/RelationshipsCard'
import {getPeopleSelector} from 'selectors/investigation/relationshipsSelectors'

const mapStateToProps = (state, _ownProps) => ({
  areRelationshipsEmpty: getPeopleSelector(state).isEmpty(),
})

export default connect(mapStateToProps)(RelationshipsCard)
