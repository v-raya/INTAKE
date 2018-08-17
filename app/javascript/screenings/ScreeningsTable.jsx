import React from 'react'
import PropTypes from 'prop-types'
import SCREENING_DECISION from '../enums/ScreeningDecision'
import SCREENING_DECISION_OPTIONS from '../enums/ScreeningDecisionOptions'
import moment from 'moment'
import {Link} from 'react-router'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'

const decisionType = (cell, row) => {
  if (['promote_to_referral', 'screen_out'].includes(row.screening_decision)) {
    const responseTimes = SCREENING_DECISION_OPTIONS[row.screening_decision]
    return responseTimes.values[row.screening_decision_detail]
  }
  return SCREENING_DECISION[row.screening_decision]
}

const textWrap = {whiteSpace: 'normal'}

const linkName = (id, referralId, name) => (name || referralId || id)

const screeningNameLink = (cell, row) => (
  <Link to={`/screenings/${row.id}`}>{linkName(row.id, row.referralId, row.name)}</Link>
)

const reportDateAndTime = (startedAt) => {
  if (moment(startedAt).isValid()) {
    return (
      <div>
        {moment(startedAt).format('L LT')} <br/>
        <em className='text-muted'>({moment(startedAt).fromNow()})</em>
      </div>
    )
  }
  return undefined
}

class ScreeningsTable extends React.Component {
  componentDidMount() {
    this.props.clearErrors()
    this.props.fetchScreenings()
  }

  render() {
    return (
      <div className='responsive'>
        <BootstrapTable
          bordered={false} data={this.props.screenings} options={{sortName: 'started_at', sortOrder: 'asc'}} tdStyle={textWrap}
        >
          <TableHeaderColumn dataField='name' dataFormat={screeningNameLink} dataSort={true} tdStyle= {textWrap} isKey={true}>
          Screening Name</TableHeaderColumn>
          <TableHeaderColumn dataField='screening_decision' dataFormat={decisionType} dataSort={false} tdStyle={textWrap}>
          Type/Decision</TableHeaderColumn>
          <TableHeaderColumn dataField='screening_status' dataSort={true}>Status</TableHeaderColumn>
          <TableHeaderColumn dataField='assignee' tdStyle= {textWrap} dataSort={false}>Assignee</TableHeaderColumn>
          <TableHeaderColumn dataField='started_at' dataFormat={reportDateAndTime} dataSort={true} tdStyle={textWrap}>
          Report Date <br/>and Time</TableHeaderColumn>
        </BootstrapTable>
      </div>
    )
  }
}

ScreeningsTable.propTypes = {
  clearErrors: PropTypes.func,
  fetchScreenings: PropTypes.func,
  screenings: PropTypes.array,
}

ScreeningsTable.defaultProps = {
  screenings: [],
}
export default ScreeningsTable
