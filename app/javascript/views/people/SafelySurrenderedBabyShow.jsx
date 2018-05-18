import PropTypes from 'prop-types'
import React from 'react'
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
    <div>hello</div>
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
      >{parentGuardGivenBraceletId ? 'Yes' : 'No'}</ShowField>
      <ShowField
        label='Parent/Guardian Provided Medical Questionaire'
        gridClassName='col-md-4'
      >{parentGuardProvMedicalQuestionaire ? 'Yes' : 'No'}</ShowField>
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
  parentGuardGivenBraceletId: PropTypes.bool,
  parentGuardProvMedicalQuestionaire: PropTypes.bool,
  relationToChild: PropTypes.string,
  surrenderedBy: PropTypes.string,
}

export default SafelySurrenderedBabyShow
