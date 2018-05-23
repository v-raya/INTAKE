import PropTypes from 'prop-types'
import React from 'react'
import DateField from 'common/DateField'
import FormField from 'common/FormField'
import GrouperHeading from 'common/GrouperHeading'
import InputField from 'common/InputField'
import SelectField from 'common/SelectField'

const SafelySurrenderedBabyForm = ({
  actions: {onChange},
  braceletId,
  comments,
  medQuestionaireReturnDate,
  parentGuardGivenBraceletId,
  parentGuardProvMedicalQuestionaire,
  relationToChild,
  surrenderedBy,
}) => {
  const onChangeField = (field) => (e) => onChange(field, e.target.value)
  return (
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
          <option key='fake-a' value='fake-a'>Fake Value A</option>
          <option key='fake-b' value='fake-b'>Fake Value B</option>
        </SelectField>
        <SelectField
          gridClassName='col-md-4'
          id='relation-to-child'
          label='Relationship to Surrendered Child'
          value={relationToChild}
          onChange={onChangeField('relationToChild')}
        >
          <option key='fake-a' value='Hagrid'>Fake Value A</option>
          <option key='fake-b' value='fake-b'>Fake Value B</option>
        </SelectField>
        <InputField
          gridClassName='col-md-4'
          id='bracelet-id'
          label='Bracelet ID'
          value={braceletId}
          onChange={onChangeField('braceletId')}
        />
        <FormField
          gridClassName='col-md-12'
          htmlFor='ssb-comments'
          label='Comments'
          required
        >
          <textarea
            id='ssb-comments'
            onChange={onChangeField('comments')}
            onBlur={() => {}}
            required
            value={comments}
          />
        </FormField>
        <SelectField
          gridClassName='col-md-4'
          id='pg-given-bracelet-id'
          label='Parent/Guardian Given Bracelet ID'
          value={parentGuardGivenBraceletId}
          onChange={onChangeField('parentGuardGivenBraceletId')}
        >
          <option key='fake-a' value='Hagrid'>Fake Value A</option>
          <option key='fake-b' value='fake-b'>Fake Value B</option>
        </SelectField>
        <SelectField
          gridClassName='col-md-4'
          id='pg-provided-medical-questionaire'
          label='Parent/Guardian Provided Medical Questionaire'
          value={parentGuardProvMedicalQuestionaire}
          onChange={onChangeField('parentGuardProvMedicalQuestionaire')}
        >
          <option key='fake-a' value='Hagrid'>Fake Value A</option>
          <option key='fake-b' value='fake-b'>Fake Value B</option>
        </SelectField>
        <DateField
          gridClassName='col-md-4'
          id='med-questionaire-return-date'
          label='Medical Questionaire Return Date'
          value={medQuestionaireReturnDate}
          hasTime={false}
          onChange={(date) => onChange('medQuestionaireReturnDate', date)}
        />
      </div>
    </div>
  )
}

SafelySurrenderedBabyForm.propTypes = {
  actions: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  braceletId: PropTypes.string,
  comments: PropTypes.string,
  medQuestionaireReturnDate: PropTypes.string,
  parentGuardGivenBraceletId: PropTypes.string,
  parentGuardProvMedicalQuestionaire: PropTypes.string,
  relationToChild: PropTypes.string,
  surrenderedBy: PropTypes.string,
}

export default SafelySurrenderedBabyForm
