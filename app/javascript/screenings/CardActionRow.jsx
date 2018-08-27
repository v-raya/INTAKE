import PropTypes from 'prop-types'
import React from 'react'

const CardActionRow = ({onCancel, onSave}) => (
  <div className='row'>
    <div className='col-md-12'>
      <div className='pull-right'>
        <button className='btn btn-default' onClick={onCancel}>Cancel</button>
        <button className='btn btn-primary' onClick={onSave}>Save</button>
      </div>
    </div>
  </div>
)

CardActionRow.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
}

export default CardActionRow
