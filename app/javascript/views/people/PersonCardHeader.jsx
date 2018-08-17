import React from 'react'
import PropTypes from 'prop-types'
import EditLink from 'common/EditLink'

const PersonCardHeader = ({informationFlag, title, onDelete, onEdit, informationPill, showDelete, showEdit}) => (
  <div className='card-header'>
    <div><h2>{title}</h2></div>
    { informationPill && <div className='information-flag-rounded'>{informationPill}</div>}
    { informationFlag && <span className='information-flag'>{informationFlag}</span>}
    <div className='edit-remove'>
      { showEdit &&
      <EditLink
        ariaLabel='Edit person'
        onClick={(event) => {
          event.preventDefault()
          onEdit()
        }}
      />
      }
      { showDelete &&
      <button aria-label='Remove person'
        className='pull-right btn btn-warning'
        onClick={onDelete}
      >
        Remove
      </button>
      }
    </div>
  </div>
)

PersonCardHeader.propTypes = {
  informationFlag: PropTypes.string,
  informationPill: PropTypes.string,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  showDelete: PropTypes.bool.isRequired,
  showEdit: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
}

export default PersonCardHeader
