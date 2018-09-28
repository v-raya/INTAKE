import React from 'react'
import ActionRow from 'screenings/ActionRow'
import CreateRelationshipForm from 'common/relationship/CreateRelationshipForm'
import {ModalComponent} from 'react-wood-duck'
import PropTypes from 'prop-types'
import {CandidatesPropType} from 'data/candidates'

export default class ScreeningCreateRelationship extends React.Component {
  constructor(props) {
    super(props)
    this.state = {show: false}
    this.closeModal = this.closeModal.bind(this)
    this.handleShowModal = this.handleShowModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.saveCreateRelationship = this.saveCreateRelationship.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (this.props.isSaving === false && prevProps.isSaving !== false) {
      this.hideModal()
    }
  }

  closeModal() {
    this.setState({
      show: false,
    })
    this.props.onCancel(this.props.personId)
  }

  handleShowModal() {
    this.setState({
      show: !this.state.show,
    })
  }

  hideModal() {
    this.setState({
      show: false,
    })
  }

  saveCreateRelationship() {
    this.props.onSave(this.props.personId)
  }

  modalFooter() {
    const {isDisabled = true, isSaving = false} = this.props
    return (
      <ActionRow
        buttonText={'Create Relationship'}
        isDisabled={isDisabled}
        isSaving={isSaving}
        onCancel={this.closeModal}
        onSave={this.saveCreateRelationship}
      />
    )
  }

  render() {
    const {candidates, onChange} = this.props
    const relationshipsButtonStatus = !this.props.relationshipsButtonStatus.createRelationshipsButtonStatus
    return (
      <div className='row'>
        <div className='col-md-12' >
          <div className='pull-right'>
            <button aria-label='Create Relationship' className='btn btn-primary' onClick={this.handleShowModal} disabled={relationshipsButtonStatus}>
              Create Relationship
            </button>
          </div>
        </div>
        <div className='col-md-12' >{this.state.show &&
          <ModalComponent
            closeModal={this.closeModal}
            showModal={this.state.show}
            modalBody={<CreateRelationshipForm candidates={candidates} onChange={onChange}/>}
            modalFooter={this.modalFooter()}
            modalSize='large'
            modalTitle={'Create Relationships'}
          />
        }
        </div>
      </div>
    )
  }
}

ScreeningCreateRelationship.propTypes = {
  candidates: CandidatesPropType,
  isDisabled: PropTypes.bool,
  isSaving: PropTypes.bool,
  onCancel: PropTypes.func,
  onChange: PropTypes.func,
  onSave: PropTypes.func,
  personId: PropTypes.string,
  relationshipsButtonStatus: PropTypes.shape({
    createRelationshipsButtonStatus: PropTypes.bool}),
}
