import PropTypes from 'prop-types'
import React from 'react'
import DateField from 'common/DateField'
import GrouperHeading from 'common/GrouperHeading'
import InputField from 'common/InputField'
import SelectField from 'common/SelectField'

const SafelySurrenderedBabyForm = ({
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
      <SelectField
        gridClassName='col-md-4'
        id='surrendered-by'
        label='Surrendered By'
        value={surrenderedBy}
        onChange={() => {}}
      >
        <option key='' value='' />
      </SelectField>
      <SelectField
        gridClassName='col-md-4'
        id='relation-to-child'
        label='Relationship to Surrendered Child'
        value={relationToChild}
        onChange={() => {}}
      >
        <option key='' value='' />
      </SelectField>
      <InputField
        gridClassName='col-md-4'
        id='bracelet-id'
        label='Bracelet ID'
        value={braceletId}
        onChange={() => {}}
      />
      <InputField
        gridClassName='col-md-12'
        id='comments'
        label='Comments'
        value={comments}
        onChange={() => {}}
      />
      <SelectField
        gridClassName='col-md-4'
        id='pg-given-bracelet-id'
        label='Parent/Guardian Given Bracelet ID'
        value={parentGuardGivenBraceletId ? 'Yes' : 'No'}
        onChange={() => {}}
      >
        <option key='' value='' />
      </SelectField>
      <SelectField
        gridClassName='col-md-4'
        id='pg-provided-medical-questionaire'
        label='Parent/Guardian Provided Medical Questionaire'
        value={parentGuardProvMedicalQuestionaire ? 'Yes' : 'No'}
        onChange={() => {}}
      >
        <option key='' value='' />
      </SelectField>
      <DateField
        gridClassName='col-md-4'
        id='med-questionaire-return-date'
        label='Medical Questionaire Return Date'
        value={medQuestionaireReturnDate}
        onChange={() => {}}
      />
    </div>
  </div>
)

SafelySurrenderedBabyForm.propTypes = {
  braceletId: PropTypes.string,
  comments: PropTypes.string,
  medQuestionaireReturnDate: PropTypes.string,
  parentGuardGivenBraceletId: PropTypes.bool,
  parentGuardProvMedicalQuestionaire: PropTypes.bool,
  relationToChild: PropTypes.string,
  surrenderedBy: PropTypes.string,
}

export default SafelySurrenderedBabyForm
