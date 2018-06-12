import {createSelector} from 'reselect'
import {
  DISTRICT_ATTORNEY,
  LAW_ENFORCEMENT,
  COMMUNITY_CARE_LICENSING,
  COUNTY_LICENSING,
} from 'enums/CrossReport'
import {getCountyAgenciesSelector} from 'selectors/systemCodeSelectors'

export const getDistrictAttorneyAgenciesSelector = createSelector(
  getCountyAgenciesSelector,
  (countyAgencies) => countyAgencies.filter((countyAgency) => countyAgency.get('type') === DISTRICT_ATTORNEY)
)
export const getLawEnforcementAgenciesSelector = createSelector(
  getCountyAgenciesSelector,
  (countyAgencies) => countyAgencies.filter((countyAgency) => countyAgency.get('type') === LAW_ENFORCEMENT)
)
export const getCountyLicensingAgenciesSelector = createSelector(
  getCountyAgenciesSelector,
  (countyAgencies) => countyAgencies.filter((countyAgency) => countyAgency.get('type') === COUNTY_LICENSING)
)
export const getCommunityCareLicensingAgenciesSelector = createSelector(
  getCountyAgenciesSelector,
  (countyAgencies) => countyAgencies.filter((countyAgency) => countyAgency.get('type') === COMMUNITY_CARE_LICENSING)
)
