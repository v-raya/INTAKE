import PropTypes from 'prop-types'
import React from 'react'
import DateField from 'common/DateField'
import FormField from 'common/FormField'
import GrouperHeading from 'common/GrouperHeading'
import InputField from 'common/InputField'
import SSBGivenBraceletSelect from 'views/people/ssb/SSBGivenBraceletSelect'
import SSBGivenMedQuestionaireSelect from 'views/people/ssb/SSBGivenMedQuestionaireSelect'
import SSBRelationSelect from 'views/people/ssb/SSBRelationSelect'

const SafelySurrenderedBabyForm = ({
  actions: {onChange},
  bracelet_id,
  comments,
  med_questionaire_return_date,
  parent_guardian_given_bracelet_id,
  parent_guardian_provided_med_questionaire,
  relation_to_child,
  surrendered_by,
}) => {
  const onChangeField = (field) => (e) => onChange(field, e.target.value)
  return (
    <div className='ssb-info'>
      <GrouperHeading text='Safely Surrendered Baby Information' />
      <div className='row'>
        <InputField
          gridClassName='col-md-4'
          id='surrendered-by'
          label='Surrendered By'
          disabled={true}
          value={surrendered_by}
          onChange={() => {}}
        />
        <SSBRelationSelect
          value={relation_to_child}
          onChange={onChangeField('relation_to_child')}
        />
        <InputField
          gridClassName='col-md-4'
          id='bracelet-id'
          label='Bracelet ID'
          value={bracelet_id}
          onChange={onChangeField('bracelet_id')}
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
          value={parent_guardian_given_bracelet_id}
          onChange={onChangeField('parent_guardian_given_bracelet_id')}
        />
        <SSBGivenMedQuestionaireSelect
          value={parent_guardian_provided_med_questionaire}
          onChange={onChangeField('parent_guardian_provided_med_questionaire')}
        />
        <DateField
          gridClassName='col-md-4'
          id='med-questionaire-return-date'
          label='Medical Questionaire Return Date'
          value={med_questionaire_return_date}
          hasTime={false}
          onChange={(date) => onChange('med_questionaire_return_date', date)}
        />
      </div>
    </div>
  )
}

SafelySurrenderedBabyForm.propTypes = {
  actions: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  bracelet_id: PropTypes.string,
  comments: PropTypes.string,
  med_questionaire_return_date: PropTypes.string,
  parent_guardian_given_bracelet_id: PropTypes.string,
  parent_guardian_provided_med_questionaire: PropTypes.string,
  relation_to_child: PropTypes.string,
  surrendered_by: PropTypes.string,
}

export default SafelySurrenderedBabyForm
