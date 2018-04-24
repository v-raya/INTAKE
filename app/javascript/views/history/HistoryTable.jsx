import React from 'react'
import PropTypes from 'prop-types'
import CaseView from 'views/history/CaseView'
import ReferralView from 'views/history/ReferralView'
import ScreeningView from 'views/history/ScreeningView'
import Clipboard from 'react-clipboard.js'

const offset = 1
const toOneBasedNumbering = (i) => i + offset

export default class HistoryTable extends React.Component {
  renderColGroup() {
    return (
      <colgroup>
        <col/>
        <col className='col-md-2'/>
        <col className='col-md-2'/>
        <col className='col-md-1'/>
        <col className='col-md-7'/>
      </colgroup>
    )
  }

  renderTHead() {
    return (
      <thead>
        <tr>
          <th scope='col'/>
          <th scope='col'>Date</th>
          <th scope='col'>Type/Status</th>
          <th scope='col'>County/Office</th>
          <th scope='col'>People and Roles</th>
        </tr>
      </thead>
    )
  }

  renderButtonRow() {
    const {onCopy, onError, onSuccess} = this.props
    return (
      <div className='row'>
        <div className='centered'>
          <Clipboard
            className='btn btn-primary'
            onSuccess={() => onSuccess(this.historyTable)}
            onError={() => onError(this.historyTable)}
            option-target={() => (onCopy(this.historyTable))}
          >
            Copy
          </Clipboard>
        </div>
      </div>
    )
  }

  render() {
    const {cases, referrals, screenings} = this.props
    return (<div className='card-body no-pad-top'>
      <div className='table-responsive' ref={(history) => { this.historyTable = history }}>
        <table className='table history-table ordered-table'>
          {this.renderColGroup()}
          {this.renderTHead()}
          <tbody>
            {screenings.map((screening, index) => <ScreeningView {...screening} index={toOneBasedNumbering(index)} key={index} />)}
            {referrals.map((referral, index) => <ReferralView {...referral} index={toOneBasedNumbering(index)} key={index} />)}
            {cases.map((hoiCase, index) => <CaseView {...hoiCase} index={toOneBasedNumbering(index)} key={index} />)}
          </tbody>
        </table>
      </div>
      {this.renderButtonRow()}
    </div>
    )
  }
}

HistoryTable.propTypes = {
  cases: PropTypes.array,
  onCopy: PropTypes.func,
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
  referrals: PropTypes.array,
  screenings: PropTypes.array,
}
