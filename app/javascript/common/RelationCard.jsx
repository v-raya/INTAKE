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
        bordered={false}
        data={data}
        expandableRow={isExpandableRow}
        expandComponent={expandComponent}
        expandColumnOptions={expandColumnComponent}
        search={true}
        searchPlaceholder='Quick Filter'
        options={{expandBy: 'column'}}
      >
        <TableHeaderColumn
          dataField='name'
          dataSort={true}
          isKey={true}
          sortHeaderColumnClassName={'table-header-sort'}
        >
            Name
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField='secondaryRelationship'
          dataSort={true}
          sortHeaderColumnClassName={'table-header-sort'}
        >
            Relationship
        </TableHeaderColumn>
        <TableHeaderColumn dataFormat={tableActions} width='5%'/>
      </BootstrapTable>
    </div>
  </div>
)

RelationCard.propTypes = propTypes

export default RelationCard
