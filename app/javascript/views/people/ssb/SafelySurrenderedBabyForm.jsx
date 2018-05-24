import PropTypes from 'prop-types'
import React from 'react'
import DateField from 'common/DateField'
import FormField from 'common/FormField'
import GrouperHeading from 'common/GrouperHeading'
import InputField from 'common/InputField'
import SelectField from 'common/SelectField'
import SSBGivenBraceletSelect from 'views/people/ssb/SSBGivenBraceletSelect'
import SSBGivenMedQuestionaireSelect from 'views/people/ssb/SSBGivenMedQuestionaireSelect'
import SSBRelationSelect from 'views/people/ssb/SSBRelationSelect'

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
        <SSBRelationSelect
          value={relationToChild}
          onChange={onChangeField('relationToChild')}
        />
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
        <SSBGivenBraceletSelect
          value={parentGuardGivenBraceletId}
          onChange={onChangeField('parentGuardGivenBraceletId')}
        />
        <SSBGivenMedQuestionaireSelect
          value={parentGuardProvMedicalQuestionaire}
          onChange={onChangeField('parentGuardProvMedicalQuestionaire')}
        />
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
