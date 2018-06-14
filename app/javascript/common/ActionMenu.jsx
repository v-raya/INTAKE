import React from 'react'
import PropTypes from 'prop-types'
import {callAttachLink} from './Relationships'

export const ActionMenu = ({relationship, pendingPeople, isScreening, screeningId, onClick}) => (
  <div className='dropdown'>
    <span
      className='glyphicon glyphicon-option-vertical'
      type='button' data-toggle='dropdown' aria-hidden='true'
    />
    <ul className='dropdown-menu dropdown-menu-right'>
      <li className='dropdown-header'>Actions</li>
      <li role='separator' className='divider'/>
      <li>{callAttachLink(relationship, pendingPeople, isScreening, screeningId, onClick)}</li>
    </ul>
  </div>
)

ActionMenu.propTypes = {
  isScreening: PropTypes.bool,
  onClick: PropTypes.func,
  pendingPeople: PropTypes.arrayOf(PropTypes.string),
  relationship: PropTypes.object,
  screeningId: PropTypes.string,
}

export default ActionMenu