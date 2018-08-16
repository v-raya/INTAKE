import US_STATE from 'enums/USState'
import LOCATION_TYPE from 'enums/LocationType'
import {createSelector} from 'reselect'
import {Map, List, fromJS} from 'immutable'
import {selectParticipantsForFerb} from 'selectors/participantSelectors'
import {getScreeningSelector} from 'selectors/screeningSelectors'
import {selectAddressCounties} from 'selectors/systemCodeSelectors'
import {isFutureDatetimeCreate, isRequiredCreate, combineCompact} from 'utils/validator'

export const getIncidentInformationFormSelector = (state) => state.get('incidentInformationForm', Map())

export const getIncidentDateSelector = createSelector(
  getIncidentInformationFormSelector,
  (incidentInformationForm) => incidentInformationForm.getIn(['incident_date', 'value'], '') || ''
)

export const getIncidentCountySelector = createSelector(
  getIncidentInformationFormSelector,
  (incidentInformationForm) => incidentInformationForm.getIn(['incident_county', 'value']) || ''
)

export const getAddressSelector = createSelector(
  getIncidentInformationFormSelector,
  (store) => store.getIn(['incidentInformationForm', 'incident_address', 'state', 'value']),
  (incidentInformationForm, state) => fromJS({
    id: incidentInformationForm.getIn(['incident_address', 'id']),
    city: incidentInformationForm.getIn(['incident_address', 'city', 'value'], '') || '',
    streetAddress: incidentInformationForm.getIn(['incident_address', 'street_address', 'value'], '') || '',
    state: state || '',
    zip: incidentInformationForm.getIn(['incident_address', 'zip', 'value'], '') || '',
  })
)

export const getLocationTypeSelector = createSelector(
  getIncidentInformationFormSelector,
  (incidentInformationForm) => incidentInformationForm.getIn(['location_type', 'value'], '')
)

export const getLocationOfChildrenSelector = (state) => state.getIn(['incidentInformationForm', 'current_location_of_children', 'value'] || '')

export const getScreeningWithEditsSelector = createSelector(
  getScreeningSelector,
  (state) => state.getIn(['incidentInformationForm', 'incident_date', 'value']),
  (state) => state.getIn(['incidentInformationForm', 'incident_county', 'value']),
  (state) => (state.getIn(['incidentInformationForm', 'incident_address']) || Map()),
  (state) => state.getIn(['incidentInformationForm', 'location_type', 'value']),
  getLocationOfChildrenSelector,
  selectParticipantsForFerb,
  (screening, incidentDate, incidentCounty, address, locationType, locationOfChildren, participants) => (
    screening.set('incident_date', incidentDate)
      .set('incident_county', incidentCounty)
      .set('incident_address', Map({
        id: address.get('id'),
        city: address.getIn(['city', 'value'], '') || '',
        street_address: address.getIn(['street_address', 'value'], '') || '',
        state: address.getIn(['state', 'value']) || '',
        zip: address.getIn(['zip', 'value'], '') || '',
      }))
      .set('location_type', locationType)
      .set('current_location_of_children', locationOfChildren)
      .set('participants', participants)
  )
)

const filterTouched = (map) => map.filter((field, key) => key !== 'id' && field.get('touched')).keySeq()

export const getTouchedFieldsSelector = createSelector(
  (state) => state.get('incidentInformationForm'),
  filterTouched
)

const selectTouchedAddressFields = (state) => {
  const address = state.getIn(['incidentInformationForm', 'incident_address']) || Map()
  return filterTouched(address)
}

const selectAddressErrors = (state) => {
  const street_address = state.getIn(['incidentInformationForm', 'incident_address', 'street_address', 'value'])
  return fromJS({
    street_address: combineCompact(isRequiredCreate(street_address, 'The incident address must be provided.')),
  })
}

export const getErrorsSelector = createSelector(
  (state) => state.getIn(['incidentInformationForm', 'incident_date', 'value']),
  (incident_date) => (fromJS({
    incident_date: combineCompact(isFutureDatetimeCreate(incident_date, 'The incident date and time cannot be in the future.')),
  }))
)

export const getVisibleErrorsSelector = createSelector(
  getErrorsSelector,
  getTouchedFieldsSelector,
  selectAddressErrors,
  selectTouchedAddressFields,
  (errors, touchedFields, addressErrors, touchedAddressFields) => errors.reduce(
    (filteredErrors, fieldErrors, field) => {
      if (touchedFields.includes(field)) {
        return filteredErrors.set(field, fieldErrors)
      }
      return filteredErrors.set(field, List())
    },
    Map()
  ).set('incident_address', addressErrors.reduce(
    (filteredErrors, fieldErrors, field) => {
      if (touchedAddressFields.includes(field)) {
        return filteredErrors.set(field, fieldErrors)
      }
      return filteredErrors.set(field, List())
    },
    Map()
  ))
)

export const selectCounties = (state) =>
  selectAddressCounties(state)
    .map((county) => ({key: county.get('code'), name: county.get('value')}))
    .toJS()

export const getStates = () => US_STATE

export const getLocationTypes = () =>
  Object.keys(LOCATION_TYPE).map((key) => ({name: key, locations: LOCATION_TYPE[key]}))
