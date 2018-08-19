import React from 'react'
import PropTypes from 'prop-types'
import EditRelationshipForm from 'common/relationship/EditRelationshipForm'
import {ModalComponent} from 'react-wood-duck'

const renderBody = (onChange, person, relationship) => (
  <EditRelationshipForm onChange={onChange} person={person} relationship={relationship}/>
)

const renderFooter = (closeModal, onChange) => (
  <div className='row'>
    <div className='col-md-12'>
      <div className='pull-right'>
        <button className='btn btn-default' onClick={closeModal}>
          Cancel
        </button>
        <button className='btn btn-primary' onClick={onChange}>
          Save Relationship
        </button>
      </div>
    </div>
  </div>
)

const EditRelationshipModal = ({
  closeModal,
  onChange,
  person,
  relationship,
  show,
}) => (
  <ModalComponent
    closeModal={closeModal}
    showModal={show}
    modalBody={renderBody(onChange, person, relationship)}
    modalFooter={renderFooter(closeModal, onChange)}
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
const relationshipPropType = PropTypes.shape({
  absent_parent_code: PropTypes.string,
  age: PropTypes.string,
  dateOfBirth: PropTypes.string,
  legacy_descriptor: PropTypes.object,
  gender: PropTypes.string,
  name: PropTypes.string,
  person_card_exists: PropTypes.bool,
  same_home_code: PropTypes.string,
  secondaryRelationship: PropTypes.string,
  type: PropTypes.string,
  type_code: PropTypes.string,
})

EditRelationshipModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  person: personPropType,
  relationship: relationshipPropType,
  show: PropTypes.bool.isRequired,
}

export default EditRelationshipModal
