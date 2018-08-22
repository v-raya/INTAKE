import US_STATE from 'enums/USState'
import {createSelector} from 'reselect'
import {Map, fromJS} from 'immutable'
import {dateFormatter} from 'utils/dateFormatter'
import {getScreeningSelector} from 'selectors/screeningSelectors'
import {systemCodeDisplayValue, selectAddressCounties} from 'selectors/systemCodeSelectors'
import {isFutureDatetimeCreate, isRequiredCreate, combineCompact} from 'utils/validator'

export const getIncidentDateSelector = createSelector(
  getScreeningSelector,
  (screening) => dateFormatter(screening.get('incident_date', ''))
)

export const getIncidentCountySelector = createSelector(
  getScreeningSelector,
  selectAddressCounties,
  (screening, addressCounties) =>
    systemCodeDisplayValue(screening.get('incident_county', ''), addressCounties) || ''
)

export const getAddressSelector = createSelector(
  getScreeningSelector,
  (store) => US_STATE.find((usState) => usState.code === store.getIn(['screening', 'incident_address', 'state'])),
  (screening, usState) => Map({
    city: screening.getIn(['incident_address', 'city'], '') || '',
    streetAddress: screening.getIn(['incident_address', 'street_address'], '') || '',
    state: usState ? usState.name : '',
    zip: screening.getIn(['incident_address', 'zip'], '') || '',
  })
)

export const getLocationTypeSelector = createSelector(
  getScreeningSelector,
  (screening) => screening.get('location_type', '')
)

export const getCurrentLocationOfChildrenSelector = createSelector(
  getScreeningSelector,
  (screening) => screening.get('current_location_of_children')
)

export const getErrorsSelector = createSelector(
  (state) => state.getIn(['screening', 'incident_date']),
  (state) => state.getIn(['screening', 'incident_address', 'street_address']),
  (state) => state.getIn(['screening', 'incident_address', 'city']),
  (incident_date, incident_address, incident_city) => (fromJS({
    incident_date: combineCompact(isFutureDatetimeCreate(incident_date, 'The incident date cannot be in the future.')),
    incident_address: combineCompact(isRequiredCreate(incident_address, 'The incident address must be provided.')),
    incident_city: combineCompact(isRequiredCreate(incident_city, 'The incident address city must be provided.')),
  }))
)
