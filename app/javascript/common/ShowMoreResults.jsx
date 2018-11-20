import React from 'react'

const ShowMoreResults = ({onClick}) => (
  <div className='row half-pad-top half-pad-bottom half-pad-right half-pad-left'>
    <button
      className='btn btn-primary btn-block gap-bottom'
      onClick={onClick}
    >
    Show more results
    </button>
  </div>
)

export default ShowMoreResults
