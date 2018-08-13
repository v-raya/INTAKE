import {createSelector} from 'reselect'
import {selectParticipantsForAPI} from 'selectors/participantSelectors'
import {getScreeningSelector} from 'selectors/screeningSelectors'
import {List} from 'immutable'

export const getAlertValuesSelector = createSelector(
  (state) => state.get('workerSafetyForm'),
  (workerSafetyForm) => workerSafetyForm.getIn(['safety_alerts', 'value']) || List([])
)

export const getInformationValueSelector = createSelector(
  (state) => state.get('workerSafetyForm'),
  (workerSafetyForm) => workerSafetyForm.getIn(['safety_information', 'value'])
)

export const getScreeningWithEditsSelector = createSelector(
  getScreeningSelector,
  getAlertValuesSelector,
  getInformationValueSelector,
  selectParticipantsForAPI,
  (screening, alerts, information, participants) => screening
    .set('safety_alerts', alerts)
    .set('safety_information', information)
    .set('participants', participants)
)
