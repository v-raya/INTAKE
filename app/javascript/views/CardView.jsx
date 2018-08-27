import React from 'react'
import PropTypes from 'prop-types'
import ClassNames from 'classnames'
import EditLink from 'common/EditLink'

const CardView = ({edit, editable, id, mode, onEdit, onShow, show, title}) => (
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
      {(mode === 'edit' || mode === undefined) && edit && React.cloneElement(edit, {onShow})}
      {mode === 'show' && show}
    </div>
  </div>
)

CardView.propTypes = {
  edit: PropTypes.element,
  editable: PropTypes.bool,
  id: PropTypes.string,
  mode: PropTypes.string,
  onEdit: PropTypes.func,
  onShow: PropTypes.func,
  show: PropTypes.element,
  title: PropTypes.string,
}

export default CardView
