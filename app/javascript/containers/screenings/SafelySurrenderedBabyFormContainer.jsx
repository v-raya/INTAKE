import React from 'react'
import {connect} from 'react-redux'
import {getSafelySurrenderedBaby} from 'selectors/screening/safelySurrenderedBabySelectors'
import SafelySurrenderedBabyForm from 'views/people/SafelySurrenderedBabyForm'

export const SafelySurrenderedBabyFormContainer = ({safelySurrenderedBaby, actions}) =>
  safelySurrenderedBaby &&
    <SafelySurrenderedBabyForm {...safelySurrenderedBaby} actions={actions}/>

const jsOrNull = (map) => (map ? map.toJS() : null)

export const mapStateToProps = (state, ownProps) => ({
  safelySurrenderedBaby: jsOrNull(getSafelySurrenderedBaby(state, ownProps.personId)),
})

export const mapDispatchToProps = (dispatch) => ({
  actions: {
    onChange(field, value) {
      dispatch({
        type: 'SAVE_SSB_FIELD',
        payload: {field, value},
      })
    },
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SafelySurrenderedBabyFormContainer)
