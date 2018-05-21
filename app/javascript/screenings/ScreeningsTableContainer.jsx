import ScreeningsTable from 'screenings/ScreeningsTable'
import {connect} from 'react-redux'
import {screeningsListSelector} from 'selectors/homePageSelectors'
import {bindActionCreators} from 'redux'
import {clearErrors} from 'actions/clearErrors'
import {fetch as fetchScreenings} from 'actions/screeningsActions'

function mapStateToProps(state, _ownProps) {
  return {
    screenings: screeningsListSelector(state).toJS(),
  }
}

function mapDispatchtoProps(dispatch, _ownProps) {
  const actions = {clearErrors, fetchScreenings}
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchtoProps)(ScreeningsTable)
