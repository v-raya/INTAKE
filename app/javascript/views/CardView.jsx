import React from 'react'
import PropTypes from 'prop-types'
import ClassNames from 'classnames'
import EditLink from 'common/EditLink'

const CardView = ({edit, editable, id, mode, onEdit, show, title}) => (
  <div>
    <a className='anchor' id={`${id}-anchor`}/>
    <div className={ClassNames('card', mode || 'edit', 'double-gap-bottom', 'position-relative')} id={id}>
      <div className='card-header'>
        <h2>{title}</h2>
        {(editable && mode === 'show') &&
          <EditLink
            ariaLabel={`Edit ${title && title.toLowerCase()}`}
            onClick={(event) => {
              event.preventDefault()
              onEdit()
            }}
          />
        }
      </div>
      {(mode === 'edit' || mode === undefined) && edit}
      {mode === 'show' && show}
    </div>
  </div>
)

CardView.propTypes = {
  edit: PropTypes.object,
  editable: PropTypes.bool,
  id: PropTypes.string,
  mode: PropTypes.string,
  onEdit: PropTypes.func,
  show: PropTypes.object,
  title: PropTypes.string,
}

export default CardView
