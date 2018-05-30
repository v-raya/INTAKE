import React from 'react'
import {connect} from 'react-redux'
import {
  getPersistedSafelySurrenderedBaby,
} from 'selectors/screening/safelySurrenderedBabySelectors'
import {getReportType} from 'selectors/screening/screeningInformationShowSelectors'
import SafelySurrenderedBabyShow from 'views/people/ssb/SafelySurrenderedBabyShow'

export const SafelySurrenderedBabyShowContainer = ({safelySurrenderedBaby, reportType}) =>
  safelySurrenderedBaby && reportType === 'ssb' &&
    <SafelySurrenderedBabyShow {...safelySurrenderedBaby} />

const jsOrNull = (map) => (map ? map.toJS() : null)

export const mapStateToProps = (state, ownProps) => ({
  safelySurrenderedBaby: jsOrNull(
    getPersistedSafelySurrenderedBaby(state, ownProps.personId)
  ),
  reportType: getReportType(state),
})

export default connect(mapStateToProps)(SafelySurrenderedBabyShowContainer)
