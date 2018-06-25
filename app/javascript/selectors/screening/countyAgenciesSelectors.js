import {createSelector} from 'reselect'
import {
  DISTRICT_ATTORNEY,
  LAW_ENFORCEMENT,
  COMMUNITY_CARE_LICENSING,
  COUNTY_LICENSING,
} from 'enums/CrossReport'
import {selectCountyAgencies} from 'selectors/systemCodeSelectors'

export const getDistrictAttorneyAgenciesSelector = createSelector(
  selectCountyAgencies,
  (countyAgencies) => countyAgencies.filter((countyAgency) => countyAgency.get('type') === DISTRICT_ATTORNEY)
)
export const getLawEnforcementAgenciesSelector = createSelector(
  selectCountyAgencies,
  (countyAgencies) => countyAgencies.filter((countyAgency) => countyAgency.get('type') === LAW_ENFORCEMENT)
)
export const getCountyLicensingAgenciesSelector = createSelector(
  selectCountyAgencies,
  (countyAgencies) => countyAgencies.filter((countyAgency) => countyAgency.get('type') === COUNTY_LICENSING)
)
export const getCommunityCareLicensingAgenciesSelector = createSelector(
  selectCountyAgencies,
  (countyAgencies) => countyAgencies.filter((countyAgency) => countyAgency.get('type') === COMMUNITY_CARE_LICENSING)
)
