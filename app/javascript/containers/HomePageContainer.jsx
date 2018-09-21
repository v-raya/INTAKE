import {createScreening} from 'actions/screeningActions'
import {createSnapshot} from 'actions/snapshotActions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {snapshotEnabledSelector, hotlineEnabledSelector} from 'selectors/homePageSelectors'
import {HomePage} from 'views/homePage'
import {getHasGenericErrorValueSelector} from 'selectors/errorsSelectors'

function mapStateToProps(state, _ownProps) {
  return {
    snapshot: snapshotEnabledSelector(state),
    hotline: hotlineEnabledSelector(state),
    hasError: getHasGenericErrorValueSelector(state),
  }
}

function mapDispatchToProps(dispatch, _ownProps) {
  const actions = {createScreening, createSnapshot}
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
