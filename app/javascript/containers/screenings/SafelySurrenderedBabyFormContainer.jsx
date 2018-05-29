import React from 'react'
import {connect} from 'react-redux'
import {setField} from 'actions/safelySurrenderedBabyActions'
import {getFormSafelySurrenderedBaby} from 'selectors/screening/safelySurrenderedBabySelectors'
import {getReportType} from 'selectors/screening/screeningInformationShowSelectors'
import SafelySurrenderedBabyForm from 'views/people/ssb/SafelySurrenderedBabyForm'

export const SafelySurrenderedBabyFormContainer = ({safelySurrenderedBaby, reportType, actions}) =>
  safelySurrenderedBaby && reportType === 'ssb' &&
    <SafelySurrenderedBabyForm {...safelySurrenderedBaby} actions={actions}/>

const jsOrNull = (map) => (map ? map.toJS() : null)

export const mapStateToProps = (state, ownProps) => ({
  safelySurrenderedBaby: jsOrNull(
    getFormSafelySurrenderedBaby(state, ownProps.personId)
  ),
  reportType: 'ssb', // getReportType(state), TODO - remove this
})

export const mapDispatchToProps = (dispatch) => ({
  actions: {
    onChange(field, value) {
      dispatch(setField(field, value))
    },
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SafelySurrenderedBabyFormContainer)
