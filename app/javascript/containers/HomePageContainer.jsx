import {createScreening} from 'actions/screeningActions'
import {createSnapshot} from 'actions/snapshotActions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {snapshotEnabledSelector, hotlineEnabledSelector} from 'selectors/homePageSelectors'
import {HomePage} from 'views/homePage'

function mapStateToProps(state, _ownProps) {
  return {
    snapshot: snapshotEnabledSelector(state),
    hotline: hotlineEnabledSelector(state),
  }
}

function mapDispatchToProps(dispatch, _ownProps) {
  const actions = {createScreening, createSnapshot}
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
