import React from 'react'
import PropTypes from 'prop-types'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'

const propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      secondaryRelationship: PropTypes.string,
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
        <TableHeaderColumn dataField='secondaryRelationship'>
            Relationship
        </TableHeaderColumn>
        <TableHeaderColumn
          dataFormat={tableActions}
          expandable={false}
          width='20%'
        >
            Actions
        </TableHeaderColumn>
      </BootstrapTable>
    </div>
  </div>
)

RelationCard.propTypes = propTypes

export default RelationCard
