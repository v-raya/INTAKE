import PropTypes from 'prop-types'
import React from 'react'
import GrouperHeading from 'common/GrouperHeading'
import ShowField from 'common/ShowField'

const SafelySurrenderedBabyShow = ({
  braceletId,
  comments,
  medQuestionaireReturnDate,
  parentGuardGivenBraceletId,
  parentGuardProvMedicalQuestionaire,
  relationToChild,
  surrenderedBy,
}) => (
  <div>
    <GrouperHeading text='Safely Surrendered Baby Information' />
    <div className='row'>
      <ShowField
        label='Surrendered By'
        gridClassName='col-md-4'
      >{surrenderedBy}</ShowField>
      <ShowField
        label='Relationship to Surrendered Child'
        gridClassName='col-md-4'
      >{relationToChild}</ShowField>
      <ShowField
        label='Bracelet ID'
        gridClassName='col-md-4'
      >{braceletId}</ShowField>

      <ShowField
        label='Comments'
        gridClassName='col-md-12'
      >{comments}</ShowField>

      <ShowField
        label='Parent/Guardian Given Bracelet ID'
        gridClassName='col-md-4'
      >{parentGuardGivenBraceletId}</ShowField>
      <ShowField
        label='Parent/Guardian Provided Medical Questionaire'
        gridClassName='col-md-4'
      >{parentGuardProvMedicalQuestionaire}</ShowField>
      <ShowField
        label='Medical Questionaire Return Date'
        gridClassName='col-md-4'
      >{medQuestionaireReturnDate}</ShowField>
    </div>
  </div>
)

SafelySurrenderedBabyShow.propTypes = {
  braceletId: PropTypes.string,
  comments: PropTypes.string,
  medQuestionaireReturnDate: PropTypes.string,
  parentGuardGivenBraceletId: PropTypes.string,
  parentGuardProvMedicalQuestionaire: PropTypes.string,
  relationToChild: PropTypes.string,
  surrenderedBy: PropTypes.string,
}

export default SafelySurrenderedBabyShow
