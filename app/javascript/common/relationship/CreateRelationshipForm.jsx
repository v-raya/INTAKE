import React from 'react'
import PropTypes from 'prop-types'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import SelectField from 'common/SelectField'
import {RELATIONSHIP_TYPES} from 'enums/RelationshipTypes'
import {CandidatesPropType} from 'data/candidates'

const textWrap = {whiteSpace: 'normal'}
const relationshipTypeFields = RELATIONSHIP_TYPES.map((relationship) => (
  <option key={relationship.value} value={relationship.value}>
    {relationship.label}
  </option>)
)

const PersonInfoList = ({name, age, gender}) => (
  <div>
    <ul className='unstyled-list'>
      <li>{name}</li>
      <li>{age}</li>
      <li>{gender}</li>
    </ul>
  </div>
)

const SelectRelationshipType = (onChange) =>
  function selectFormat(cell, {person, candidate}) {
    return (
      <SelectField
        id='change_relationship_type'
        label='Relationship Type'
        onChange={({target}) =>
          (onChange(person.id, candidate.id, 'relationshipType', target.value))
        }
        value={candidate.relationshipType}
      >
        <option key=''/>
        {relationshipTypeFields}
      </SelectField>
    )
  }

const CreateRelationshipForm = ({candidates, onChange}) => (
  <BootstrapTable withoutTabIndex className='displayTable' bordered={false} data={candidates}>
    <TableHeaderColumn
      className = 'FocusPersonDetails'
      dataField='person'
      dataFormat={PersonInfoList}
      tdStyle= {textWrap}
      headerTitle={false}
    >
      Focus Person
    </TableHeaderColumn>
    <TableHeaderColumn dataField='candidates' dataFormat={SelectRelationshipType(onChange)} headerTitle={false}>
      Relationship<br/>
      <div className='text-helper'>Focus Person / Related Person</div>
    </TableHeaderColumn>
    <TableHeaderColumn
      className = 'relatedPersonDetails'
      dataField='candidate'
      dataFormat={PersonInfoList}
      isKey={true}
      tdStyle={textWrap}
      headerTitle={false}
    >
      Related Person
    </TableHeaderColumn>
  </BootstrapTable>
)

PersonInfoList.propTypes = {
  age: PropTypes.string,
  gender: PropTypes.string,
  name: PropTypes.string,
}

CreateRelationshipForm.propTypes = {
  candidates: CandidatesPropType,
  onChange: PropTypes.func,
}

export default CreateRelationshipForm
