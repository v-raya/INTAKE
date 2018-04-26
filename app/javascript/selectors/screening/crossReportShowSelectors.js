import {createSelector} from 'reselect'
import {getCountyAgenciesSelector} from 'selectors/screening/countyAgenciesSelectors'
import {Map, List, fromJS} from 'immutable'
import {
  AGENCY_TYPES,
  CROSS_REPORTS_REQUIRED_FOR_ALLEGATIONS,
  DISTRICT_ATTORNEY,
  COUNTY_LICENSING,
  COMMUNITY_CARE_LICENSING,
  LAW_ENFORCEMENT,
} from 'enums/CrossReport'
import {
  isRequiredIfCreate,
  combineCompact,
} from 'utils/validator'
import {areCrossReportsRequired} from 'utils/allegationsHelper'

export const getCrossReportSelector = (state) => state.getIn(['screening', 'cross_reports', 0]) || Map()

export const getCrossReportAgenciesSelector = (state) => state.getIn(['screening', 'cross_reports', 0, 'agencies']) || List()

export const getAgencyCodeToNameSelector = createSelector(
  getCrossReportAgenciesSelector,
  getCountyAgenciesSelector,
  (agencies, countyAgencies) => agencies.reduce((agencyCodeToName, agency) => {
    const agencyTypeName = AGENCY_TYPES[agency.get('type')]
    const agencyCode = agency.get('id')

    if (!agencyCode) { return agencyCodeToName }

    const agencyData = countyAgencies.find((countyAgency) => countyAgency.get('id') === agencyCode)
    agencyCodeToName[agencyCode] = `${agencyTypeName} - ${agencyData && agencyData.get('name') || agencyCode}`
    return agencyCodeToName
  }, {})
)

export const getSelectedCrossReportAgencyNamesSelector = createSelector(
  getCrossReportAgenciesSelector,
  getAgencyCodeToNameSelector,
  (agencies, agencyCodeToName) => agencies.reduce((names, agency) => {
    const {type, id} = agency.toJS()
    return names.set(type, id ? agencyCodeToName[id] : AGENCY_TYPES[type])
  }, Map())
)

const findAgencyData = (agencies, agencyType) => {
  const agency = agencies.find((agency) => agency.get('type') === agencyType)
  if (agency) {
    return agency.toJS()
  } else {
    return {}
  }
}

const isBlank = (value) => (value === undefined || value === '')

export const getAgencyRequiredErrors = (type, agencies, allegations) => {
  const {selectedType, id} = findAgencyData(agencies, type)
  if (areCrossReportsRequired(allegations) && isBlank(selectedType) && isBlank(id)) {
    return `Please indicate cross-reporting to ${AGENCY_TYPES[type].toLowerCase()}.`
  }
  return undefined
}
export const getDistrictAttorneyErrors = (agencies) => {
  const {type, id} = findAgencyData(agencies, DISTRICT_ATTORNEY)
  if (isBlank(type) || id) {
    return undefined
  } else {
    return 'Please enter an agency name.'
  }
}

export const getLawEnforcementErrors = (agencies) => {
  const {type, id} = findAgencyData(agencies, LAW_ENFORCEMENT)
  if (isBlank(type) || id) {
    return undefined
  } else {
    return 'Please enter an agency name.'
  }
}

export const getCountyLicensingErrors = (agencies) => {
  const {type, id} = findAgencyData(agencies, COUNTY_LICENSING)
  if (isBlank(type) || id) {
    return undefined
  } else {
    return 'Please enter an agency name.'
  }
}

export const getCommunityCareLicensingErrors = (agencies) => {
  const {type, id} = findAgencyData(agencies, COMMUNITY_CARE_LICENSING)
  if (isBlank(type) || id) {
    return undefined
  } else {
    return 'Please enter an agency name.'
  }
}

export const getAllegationsRequireCrossReportsValueSelector = createSelector(
  getCrossReportAgenciesSelector,
  (state) => state.get('allegationsForm'),
  (agencies, allegations) => areCrossReportsRequired(allegations) &&
    CROSS_REPORTS_REQUIRED_FOR_ALLEGATIONS.some((requiredAgencyType) => agencies.every((agency) => agency.get('type') !== requiredAgencyType))
)

export const getErrorsSelector = createSelector(
  getCrossReportSelector,
  getCrossReportAgenciesSelector,
  (state) => state.get('allegationsForm'),
  (crossReport, agencies, allegations) => fromJS({
    informDate: combineCompact(isRequiredIfCreate(crossReport.get('inform_date'), 'Please enter a cross-report date.', () => (agencies.size !== 0))),
    method: combineCompact(isRequiredIfCreate(crossReport.get('method'), 'Please select a cross-report communication method.', () => (agencies.size !== 0))),
    [COMMUNITY_CARE_LICENSING]: combineCompact(() => (getCommunityCareLicensingErrors(agencies))),
    [COUNTY_LICENSING]: combineCompact(() => (getCountyLicensingErrors(agencies))),
    [DISTRICT_ATTORNEY]: combineCompact(() => (getDistrictAttorneyErrors(agencies))),
    [LAW_ENFORCEMENT]: combineCompact(() => (getLawEnforcementErrors(agencies))),
    agencyRequired: combineCompact(
      () => (getDistrictAttorneyErrors(agencies) ? undefined : getAgencyRequiredErrors(DISTRICT_ATTORNEY, agencies, allegations)),
      () => (getLawEnforcementErrors(agencies) ? undefined : getAgencyRequiredErrors(LAW_ENFORCEMENT, agencies, allegations))
    ),
  })
)
