import React from 'react'
import {connect} from 'react-redux'
import {getSafelySurrenderedBaby} from 'selectors/screening/safelySurrenderedBabySelectors'
import SafelySurrenderedBabyForm from 'views/people/SafelySurrenderedBabyForm'

export const SafelySurrenderedBabyFormContainer = ({safelySurrenderedBaby}) =>
  safelySurrenderedBaby &&
    <SafelySurrenderedBabyForm {...safelySurrenderedBaby} />

const jsOrNull = (map) => (map ? map.toJS() : null)

export const mapStateToProps = (state, ownProps) => ({
  safelySurrenderedBaby: jsOrNull(getSafelySurrenderedBaby(state, ownProps.personId)),
})

export default connect(mapStateToProps)(SafelySurrenderedBabyFormContainer)
