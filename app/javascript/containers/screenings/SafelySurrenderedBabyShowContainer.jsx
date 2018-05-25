import React from 'react'
import {connect} from 'react-redux'
import {
  getPersistedSafelySurrenderedBaby,
} from 'selectors/screening/safelySurrenderedBabySelectors'
import SafelySurrenderedBabyShow from 'views/people/ssb/SafelySurrenderedBabyShow'

export const SafelySurrenderedBabyShowContainer = ({safelySurrenderedBaby}) =>
  safelySurrenderedBaby &&
    <SafelySurrenderedBabyShow {...safelySurrenderedBaby} />

const jsOrNull = (map) => (map ? map.toJS() : null)

export const mapStateToProps = (state, ownProps) => ({
  safelySurrenderedBaby: jsOrNull(
    getPersistedSafelySurrenderedBaby(state, ownProps.personId)
  ),
})

export default connect(mapStateToProps)(SafelySurrenderedBabyShowContainer)
