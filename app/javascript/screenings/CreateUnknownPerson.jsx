import React from 'react'

const CreateUnknownPerson = ({onClick}) => (
  <div className='row half-pad-top half-pad-bottom half-pad-right half-pad-left'>
    <button className='btn btn-default btn-block gap-bottom'
      aria-label='Create a new person'
      onClick={onClick}
    >
      <i className='fa fa-plus' /> Create a new person
    </button>
  </div>
)

export default CreateUnknownPerson
