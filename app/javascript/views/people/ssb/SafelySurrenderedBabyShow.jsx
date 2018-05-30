import PropTypes from 'prop-types'
import React from 'react'
import GrouperHeading from 'common/GrouperHeading'
import ShowField from 'common/ShowField'

const SafelySurrenderedBabyShow = ({
  bracelet_id,
  comments,
  med_questionaire_return_date,
  parent_guardian_given_bracelet_id,
  parent_guardian_provided_med_questionaire,
  relation_to_child,
  surrendered_by,
}) => (
  <div>
    <GrouperHeading text='Safely Surrendered Baby Information' />
    <div className='row'>
      <ShowField
        label='Surrendered By'
        gridClassName='col-md-4'
      >{surrendered_by}</ShowField>
      <ShowField
        label='Relationship to Surrendered Child'
        gridClassName='col-md-4'
      >{relation_to_child}</ShowField>
      <ShowField
        label='Bracelet ID'
        gridClassName='col-md-4'
      >{bracelet_id}</ShowField>

      <ShowField
        label='Comments'
        gridClassName='col-md-12'
      >{comments}</ShowField>

      <ShowField
        label='Parent/Guardian Given Bracelet ID'
        gridClassName='col-md-4'
      >{parent_guardian_given_bracelet_id}</ShowField>
      <ShowField
        label='Parent/Guardian Provided Medical Questionaire'
        gridClassName='col-md-4'
      >{parent_guardian_provided_med_questionaire}</ShowField>
      <ShowField
        label='Medical Questionaire Return Date'
        gridClassName='col-md-4'
      >{med_questionaire_return_date}</ShowField>
    </div>
  </div>
)

SafelySurrenderedBabyShow.propTypes = {
  bracelet_id: PropTypes.string,
  comments: PropTypes.string,
  med_questionaire_return_date: PropTypes.string,
  parent_guardian_given_bracelet_id: PropTypes.string,
  parent_guardian_provided_med_questionaire: PropTypes.string,
  relation_to_child: PropTypes.string,
  surrendered_by: PropTypes.string,
}

export default SafelySurrenderedBabyShow
