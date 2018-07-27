import React from 'react'
import {ModalComponent} from 'react-wood-duck'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import SelectField from 'common/SelectField'
import PropTypes from 'prop-types'
import {RELATIONSHIP_TYPES} from 'enums/RelationshipTypes'

export default class ScreeningCreateRelationship extends React.Component {
  constructor(props) {
    super(props)
    this.state = {show: false}
    this.handleShowModal = this.handleShowModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.modalTable = this.modalTable.bind(this)
  }

  handleShowModal() {
    this.setState({
      show: !this.state.show,
    })
  }

  closeModal() {
    this.setState({
      show: false,
    })
  }

  modalTable(data) {
    return (
      <BootstrapTable bordered={false} data={data}>
        <TableHeaderColumn dataField='focus_person' dataAlign='center' tdStyle={{whiteSpace: 'normal'}}>
          Focus Person
        </TableHeaderColumn>
        <TableHeaderColumn dataField='relationship' dataFormat={this.selectFieldFormat}>
          Relationship<br/>
          <div className='text-helper'>Focus Person / Related Person</div>
        </TableHeaderColumn>
        <TableHeaderColumn dataField='related_person' isKey={true} dataAlign='center' tdStyle={{whiteSpace: 'normal'}}>
          Related Person
        </TableHeaderColumn>
      </BootstrapTable>
    )
  }

  modalTitle() {
    return (<b>
      Create Relationship Type
    </b>)
  }

  selectFieldFormat() {
    return (
      <SelectField
        id='change_relationship_type'
        label=''
      >
        <option key=''/>
        {RELATIONSHIP_TYPES.map((relationship) =>
          <option key={relationship.value} value={relationship.value}>{relationship.label}</option>)
        }
      </SelectField>
    )
  }

  modalFooter() {
    return (
      <div>
        <button aria-label='Cancel' className='btn btn-default' onClick={this.closeModal}> Cancel </button>
        <button aria-label='Create Relationship' className='btn btn-primary'>Create Relationship </button>
      </div>
    )
  }

  render() {
    return (
      <div className='row'>
        <div className='col-md-12' >
          <div className='pull-right'>
            <button
              aria-label='Create Relationship'
              className='btn btn-primary'
              onClick={this.handleShowModal}
            >
              Create Relationship
            </button>
          </div>
        </div>
        <div className='col-md-12' >
          <ModalComponent
            closeModal={this.closeModal}
            showModal={this.state.show}
            modalBody={this.modalTable(this.props.data)}
            modalFooter={this.modalFooter()}
            modalSize='large'
            modalTitle={'Create Relationship'}
          />
        </div>
      </div>
    )
  }
}

ScreeningCreateRelationship.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    focus_person: PropTypes.string,
    related_person: PropTypes.string,
  })),
}
