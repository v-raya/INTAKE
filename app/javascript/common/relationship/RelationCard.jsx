import React from 'react'
import PropTypes from 'prop-types'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import {sortDateOfBirth} from 'utils/sortDateOfBirth'

const propTypes = {
  ageDisplayFormatter: PropTypes.func,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      secondaryRelationship: PropTypes.string,
    })
  ),
  expandColumnComponent: PropTypes.any,
  expandComponent: PropTypes.func,
  isExpandableRow: PropTypes.func,
  name: PropTypes.string,
  tableActions: PropTypes.func,
}

const textWrap = {whiteSpace: 'normal'}

const RelationCard = ({
  data,
  isExpandableRow,
  expandComponent,
  expandColumnComponent,
  name,
  tableActions,
  ageDisplayFormatter,
}) => (
  <div>
    <div className='child-name'>
      <b>
        {name}
      </b>
    </div>
    <div>
      <BootstrapTable
        bordered={false}
        data={data}
        expandableRow={isExpandableRow}
        expandComponent={expandComponent}
        expandColumnOptions={expandColumnComponent}
        search={false}
        searchPlaceholder='Quick Filter'
        options={{expandBy: 'column'}}
      >
        <TableHeaderColumn
          tdStyle= {textWrap}
          dataField='name'
          dataSort={true}
          isKey={true}
          sortHeaderColumnClassName='sorted-header'
        >
            Name
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField='secondaryRelationship'
          dataSort={true}
          sortHeaderColumnClassName='sorted-header'
        >
            Relationship
        </TableHeaderColumn>
        <TableHeaderColumn
          dataFormat={ageDisplayFormatter}
          dataField='age'
          dataSort={true}
          sortHeaderColumnClassName='sorted-header'
          sortFunc={sortDateOfBirth}
        >
            Age
        </TableHeaderColumn>
        <TableHeaderColumn dataFormat={tableActions} width='5%'/>
      </BootstrapTable>
    </div>
  </div>
)

RelationCard.propTypes = propTypes

export default RelationCard
