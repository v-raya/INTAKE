import React, {Component} from 'react'
import PropTypes from 'prop-types'
import AttachLink from 'common/relationship/AttachLink'
import EditRelationshipForm from 'common/relationship/EditRelationshipForm'
import {ModalComponent} from 'react-wood-duck'

export class ActionMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {show: false}
    this.closeModal = this.closeModal.bind(this)
    this.handleShowModal = this.handleShowModal.bind(this)
  }

  closeModal() {
    this.setState({show: false})
  }

  handleShowModal() {
    this.setState({show: true})
  }

  renderFooter(closeModal) {
    return (
      <div className='row'>
        <div className='col-md-12'>
          <div className='pull-right'>
            <button className='btn btn-default' onClick={closeModal}>Cancel</button>
            <button className='btn btn-primary'>Save Relationship</button>
          </div>
        </div>
      </div>
    )
  }

  renderEditRelationshipForm() {
    return (
      <EditRelationshipForm
        onChange={this.props.onChange}
        person={this.props.person}
        relationship={this.props.relationship}
      />
    )
  }

  renderModal() {
    return (
      <ModalComponent
        closeModal={this.closeModal}
        showModal={this.state.show}
        modalBody={this.renderEditRelationshipForm()}
        modalFooter={this.renderFooter(this.closeModal)}
        modalSize='large'
        modalTitle='Edit Relationship Type'
      />
    )
  }

  render() {
    return (
      <div>
        <div className='dropdown' aria-label='Action Menu'>
          <span className='glyphicon glyphicon-option-vertical' type='button' data-toggle='dropdown' aria-hidden='true'/>
          <ul className='dropdown-menu dropdown-menu-right' role='menu' aria-hidden='true'>
            <li className='dropdown-header'>Actions</li>
            <li role='separator' className='divider'/>
            <li role='menuitem'><AttachLink {...this.props}/></li>
            <li role='menuitem'>
              <a className='edit-relationship' onClick={this.handleShowModal}>
                Edit Relationship
              </a>
            </li>
          </ul>
        </div>
        {this.renderModal()}
      </div>
    )
  }
}

ActionMenu.propTypes = {
  isScreening: PropTypes.bool,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  pendingPeople: PropTypes.arrayOf(PropTypes.string),
  person: PropTypes.object,
  relationship: PropTypes.object,
  screeningId: PropTypes.string,
}

export default ActionMenu
