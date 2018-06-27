import {createSelector} from 'reselect'
import {getScreeningSelector} from 'selectors/screeningSelectors'
import {List} from 'immutable'

export const getAlertValuesSelector = createSelector(
  getScreeningSelector,
  (screening) => screening.get('safety_alerts', List())
)

export const getInformationValueSelector = createSelector(
  getScreeningSelector,
  (screening) => screening.get('safety_information')
)
