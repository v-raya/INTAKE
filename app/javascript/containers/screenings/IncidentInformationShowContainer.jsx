import {connect} from 'react-redux'
import {
  getIncidentDateSelector,
  getIncidentCountySelector,
  getAddressSelector,
  getCurrentLocationOfChildrenSelector,
  getLocationTypeSelector,
  getErrorsSelector,
} from 'selectors/screening/incidentInformationShowSelector'
import IncidentInformationShow from 'views/IncidentInformationShow'

const mapStateToProps = (state, _ownProps) => ({
  errors: getErrorsSelector(state).toJS(),
  incidentDate: getIncidentDateSelector(state),
  incidentCounty: getIncidentCountySelector(state),
  address: getAddressSelector(state).toJS(),
  locationType: getLocationTypeSelector(state),
  locationOfChildren: getCurrentLocationOfChildrenSelector(state),
})

export default connect(mapStateToProps)(IncidentInformationShow)
