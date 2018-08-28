import {EDIT_MODE, SHOW_MODE} from 'actions/screeningPageActions'
import PersonCardHeader from 'views/people/PersonCardHeader'
import PropTypes from 'prop-types'
import React from 'react'
import CardActionRow from 'screenings/CardActionRow'

const PersonCard = ({
  deletable,
  edit,
  editable,
  informationFlag,
  informationPill,
  mode,
  onCancel,
  onDelete,
  onEdit,
  onSave,
  personId,
  personName,
  show,
}) => (
  <div className={`card ${mode} participant double-gap-bottom`} id={`participants-card-${personId}`}>
    <PersonCardHeader
      informationFlag={informationFlag}
      onDelete={onDelete}
      showDelete={deletable}
      onEdit={onEdit}
      showEdit={editable && mode === SHOW_MODE}
      title={personName}
      informationPill={informationPill}
    />
    <div className='card-body'>
      {mode === SHOW_MODE && show}
      {mode === EDIT_MODE && edit}
      {mode === EDIT_MODE && <CardActionRow onCancel={onCancel} onSave={onSave} />}
    </div>
  </div>
)

PersonCard.propTypes = {
  deletable: PropTypes.bool,
  edit: PropTypes.object,
  editable: PropTypes.bool.isRequired,
  informationFlag: PropTypes.string,
  informationPill: PropTypes.string,
  mode: PropTypes.oneOf([EDIT_MODE, SHOW_MODE]).isRequired,
  onCancel: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onSave: PropTypes.func,
  personId: PropTypes.string.isRequired,
  personName: PropTypes.string.isRequired,
  show: PropTypes.object,
}

export default PersonCard
