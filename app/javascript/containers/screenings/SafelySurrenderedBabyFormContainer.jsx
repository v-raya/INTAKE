import React from 'react'
import {connect} from 'react-redux'
import {setField} from 'actions/safelySurrenderedBabyActions'
import {getFormSafelySurrenderedBaby} from 'selectors/screening/safelySurrenderedBabySelectors'
import {getReportType} from 'selectors/screening/screeningInformationShowSelectors'
import SafelySurrenderedBabyForm from 'views/people/ssb/SafelySurrenderedBabyForm'

export const SafelySurrenderedBabyFormContainer = ({safelySurrenderedBaby, reportType, actions}) =>
  safelySurrenderedBaby && reportType === 'ssb' &&
    <SafelySurrenderedBabyForm {...safelySurrenderedBaby} actions={actions}/>

export const mapStateToProps = (state, ownProps) => ({
  safelySurrenderedBaby: getFormSafelySurrenderedBaby(state, ownProps.personId)
    .map((imm) => imm.toJS()).valueOrElse(null),
  reportType: getReportType(state),
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
