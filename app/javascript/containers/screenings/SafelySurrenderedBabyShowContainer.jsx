import React from 'react'
import {connect} from 'react-redux'
import {getSafelySurrenderedBaby} from 'selectors/screening/safelySurrenderedBabySelectors'
import SafelySurrenderedBabyShow from 'views/people/SafelySurrenderedBabyShow'

export const SafelySurrenderedBabyShowContainer = ({safelySurrenderedBaby}) =>
  safelySurrenderedBaby &&
    <SafelySurrenderedBabyShow {...safelySurrenderedBaby} />

export const mapStateToProps = (state, ownProps) => ({
  safelySurrenderedBaby: getSafelySurrenderedBaby(state, ownProps.personId) ? {
    surrenderedBy: 'Hagrid',
    relationToChild: 'Groundskeeper',
    braceletId: 'Lightning',
    parentGuardGivenBraceletId: true,
    parentGuardProvMedicalQuestionaire: false,
    comments: 'Yer a wizard, Harry!',
    medQuestionaireReturnDate: '2001-11-14',
  } : null,
})

export default connect(mapStateToProps)(SafelySurrenderedBabyShowContainer)
