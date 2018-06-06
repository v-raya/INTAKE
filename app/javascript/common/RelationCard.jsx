import React from 'react'
import PropTypes from 'prop-types'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'

const propTypes = {
  attachActions: PropTypes.func,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      secondaryRelationship: PropTypes.string,
      ageBirth: PropTypes.string,
    })
  ),
  expandColumnComponent: PropTypes.any,
  expandComponent: PropTypes.func,
  firstName: PropTypes.string,
  isExpandableRow: PropTypes.func,
  lastName: PropTypes.string,
  tableActions: PropTypes.func,
}

const RelationCard = ({
  attachActions,
  firstName,
  lastName,
  data,
  isExpandableRow,
  expandComponent,
  expandColumnComponent,
  tableActions,
}) => (
  <div>
    <div className='childName'>
      <b>
        {firstName} {lastName}
      </b>
    </div>
    <div>
      <BootstrapTable
        data={data}
        searchPlaceholder='Quick Filter'
        search={true}
        expandableRow={isExpandableRow}
        expandComponent={expandComponent}
        expandColumnOptions={expandColumnComponent}
        options={{expandBy: 'column'}}
      >
        <TableHeaderColumn dataField='name' isKey={true}>
            Name
        </TableHeaderColumn>
        <TableHeaderColumn dataField='secondaryRelationship' width='30%'>
            Relationship to Focus Person
        </TableHeaderColumn>
        <TableHeaderColumn dataField='ageBirth'>Age</TableHeaderColumn>
        <TableHeaderColumn dataFormat={tableActions} expandable={false}>
            Actions
        </TableHeaderColumn>

        <TableHeaderColumn dataFormat={attachActions} expandable={false}>
            Attach
        </TableHeaderColumn>
      </BootstrapTable>
    </div>
  </div>
)

RelationCard.propTypes = propTypes

export default RelationCard
