import React from 'react'
import {connect} from 'react-redux'
import {setField} from 'actions/safelySurrenderedBabyActions'
import {getFormSafelySurrenderedBaby} from 'selectors/screening/safelySurrenderedBabySelectors'
import SafelySurrenderedBabyForm from 'views/people/ssb/SafelySurrenderedBabyForm'

export const SafelySurrenderedBabyFormContainer = ({safelySurrenderedBaby, actions}) =>
  safelySurrenderedBaby &&
    <SafelySurrenderedBabyForm {...safelySurrenderedBaby} actions={actions}/>

const jsOrNull = (map) => (map ? map.toJS() : null)

export const mapStateToProps = (state, ownProps) => ({
  safelySurrenderedBaby: jsOrNull(
    getFormSafelySurrenderedBaby(state, ownProps.personId)
  ),
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
