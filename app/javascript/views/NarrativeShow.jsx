import React from 'react'
import PropTypes from 'prop-types'
import ShowField from 'common/ShowField'

const NarrativeShow = ({narrative, errors}) => (
  <div className='card-body'>
    <div className='row'>
      <ShowField gridClassName='col-md-12 text-area-show' label='Report Narrative' errors={errors} required>
        {narrative}
      </ShowField>
    </div>
  </div>
)

NarrativeShow.propTypes = {
  errors: PropTypes.array,
  narrative: PropTypes.string,
}

export default NarrativeShow
