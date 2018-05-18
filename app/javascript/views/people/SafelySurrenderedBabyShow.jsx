import React from 'react'
import ShowField from 'common/ShowField'

const SafelySurrenderedBabyShow = () => (
  <div>
    <div>hello</div>
    <div className='row'>
      <ShowField
        label='Surrendered By'
        gridClassName='col-md-4'
      >Foo!</ShowField>
      <ShowField
        label='Relationship to Surrendered Child'
        gridClassName='col-md-4'
      >Foo!</ShowField>
      <ShowField
        label='Bracelet ID'
        gridClassName='col-md-4'
      >Foo!</ShowField>

      <ShowField
        label='Comments'
        gridClassName='col-md-12'
      >Foo!</ShowField>

      <ShowField
        label='Parent/Guardian Given Bracelet ID'
        gridClassName='col-md-4'
      >Foo!</ShowField>
      <ShowField
        label='Parent/Guardian Provided Medical Questionaire'
        gridClassName='col-md-4'
      >Foo!</ShowField>
      <ShowField
        label='Medical Questionaire Return Date'
        gridClassName='col-md-4'
      >Foo!</ShowField>
    </div>
  </div>
)

export default SafelySurrenderedBabyShow
