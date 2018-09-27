import PropTypes from 'prop-types'
import React from 'react'
import SavingButton from 'common/SavingButton'

const ActionRow = ({buttonText, isSaving, onCancel, onSave}) => (
  <div className='row'>
    <div className='col-md-12'>
      <div className='pull-right'>
        {!isSaving &&
          <button className='btn btn-default' onClick={onCancel}>Cancel</button>}
        {isSaving ?
          <SavingButton text='Saving'/> :
          <button className='btn btn-primary' onClick={onSave}>{buttonText}</button>}
      </div>
    </div>
  </div>
)

ActionRow.defaultProps = {
  buttonText: 'Save',
}

ActionRow.propTypes = {
  buttonText: PropTypes.string,
  isSaving: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
}

export default ActionRow
