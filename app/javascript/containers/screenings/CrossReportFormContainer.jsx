import {
  AGENCY_TYPES,
  DISTRICT_ATTORNEY,
  LAW_ENFORCEMENT,
  COUNTY_LICENSING,
  COMMUNITY_CARE_LICENSING,
} from 'enums/CrossReport'
import {
  getDistrictAttorneyAgenciesSelector,
  getLawEnforcementAgenciesSelector,
  getCountyLicensingAgenciesSelector,
  getCommunityCareLicensingAgenciesSelector,
} from 'selectors/screening/countyAgenciesSelectors'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import CrossReportForm from 'views/CrossReportForm'
import {fetch as fetchCountyAgencies} from 'actions/countyAgenciesActions'
import {
  clearAllAgencyFields,
  clearAllFields,
  save as saveCrossReport,
  setAgencyField,
  setAgencyTypeField,
  setField,
  touchAgencyField,
  touchAllFields,
  touchField,
} from 'actions/crossReportFormActions'
import {saveCard, clearCardEdits} from 'actions/screeningActions'
import {
  getAllegationsRequireCrossReportsValueSelector,
  getVisibleErrorsSelector,
  getScreeningWithEditsSelector,
  getDistrictAttorneyFormSelector,
  getLawEnforcementFormSelector,
  getCountyLicensingFormSelector,
  getCommunityCareLicensingFormSelector,
  getUserCountySelector,
} from 'selectors/screening/crossReportFormSelectors'
import {selectCounties} from 'selectors/systemCodeSelectors'

export const cardName = 'cross-report-card'

const mapStateToProps = (state, {onShow}) => ({
  allegationsRequireCrossReports: getAllegationsRequireCrossReportsValueSelector(state),
  areCrossReportsRequired: getAllegationsRequireCrossReportsValueSelector(state),
  cardName: cardName,
  communityCareLicensing: getCommunityCareLicensingFormSelector(state).toJS(),
  counties: selectCounties(state).toJS(),
  county_id: state.getIn(['crossReportForm', 'county_id', 'value']) || '',
  countyAgencies: {
    [DISTRICT_ATTORNEY]: getDistrictAttorneyAgenciesSelector(state).toJS(),
    [LAW_ENFORCEMENT]: getLawEnforcementAgenciesSelector(state).toJS(),
    [COMMUNITY_CARE_LICENSING]: getCommunityCareLicensingAgenciesSelector(state).toJS(),
    [COUNTY_LICENSING]: getCountyLicensingAgenciesSelector(state).toJS(),
  },
  countyLicensing: getCountyLicensingFormSelector(state).toJS(),
  districtAttorney: getDistrictAttorneyFormSelector(state).toJS(),
  hasAgencies: Boolean(Object.keys(AGENCY_TYPES).reduce((result, key) => result || state.getIn(['crossReportForm', key, 'selected']), false)),
  errors: getVisibleErrorsSelector(state).toJS(),
  inform_date: state.getIn(['crossReportForm', 'inform_date', 'value']) || '',
  lawEnforcement: getLawEnforcementFormSelector(state).toJS(),
  method: state.getIn(['crossReportForm', 'method', 'value']) || '',
  screeningWithEdits: getScreeningWithEditsSelector(state).toJS(),
  userCounty: getUserCountySelector(state),
  onShow,
})
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    clearAllAgencyFields,
    clearAllFields,
    saveCrossReport,
    setAgencyField,
    setAgencyTypeField,
    setField,
    touchAgencyField,
    touchAllFields,
    touchField,
    saveCard,
    fetchCountyAgencies,
    clearCardEdits,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(CrossReportForm)
