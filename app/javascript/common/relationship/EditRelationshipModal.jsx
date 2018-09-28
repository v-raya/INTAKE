import React from 'react'
import PropTypes from 'prop-types'
import EditRelationshipForm from 'common/relationship/EditRelationshipForm'
import {ModalComponent} from 'react-wood-duck'
import ActionRow from 'screenings/ActionRow'
import {RelationshipPropType} from 'data/relationships'

const EditRelationshipModal = ({
  closeModal,
  editFormRelationship,
  errors,
  isFormChanged,
  isSaving,
  onChange,
  onSave,
  person,
  relationship,
  show,
}) => (
  <ModalComponent
    closeModal={closeModal}
    showModal={show}
    modalBody={
      <EditRelationshipForm
        editFormRelationship={editFormRelationship}
        errors={errors}
        onChange={onChange}
        person={person}
        relationship={relationship}
      />
    }
    modalFooter={
      <ActionRow
        buttonText={'Save Relationship'}
        isDisabled={isFormChanged}
        isSaving={isSaving}
        onCancel={closeModal}
        onSave={() => onSave(editFormRelationship.id)}
      />
    }
    modalSize='large'
    modalTitle='Edit Relationship Type'
  />
)

const personPropType = PropTypes.shape({
  age: PropTypes.string,
  dateOfBirth: PropTypes.string,
  legacy_id: PropTypes.string,
  gender: PropTypes.string,
  name: PropTypes.string,
})

EditRelationshipModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  editFormRelationship: PropTypes.shape({
    absent_parent_indicator: PropTypes.bool,
    client_id: PropTypes.string,
    end_date: PropTypes.string,
    id: PropTypes.string,
    relationship_type: PropTypes.number,
    relative_id: PropTypes.string,
    same_home_status: PropTypes.string,
    start_date: PropTypes.string,
  }),
  errors: PropTypes.shape({
    started_at: PropTypes.array,
  }),
  isFormChanged: PropTypes.bool,
  isSaving: PropTypes.bool,
  onChange: PropTypes.func,
  onSave: PropTypes.func,
  person: personPropType,
  relationship: RelationshipPropType,
  show: PropTypes.bool.isRequired,
}

export default EditRelationshipModal
