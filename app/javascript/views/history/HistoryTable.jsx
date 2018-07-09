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
    const {replace} = this.props
    return (
      <div className='row'>
        <div className='centered'>
          <Clipboard
            className='btn btn-primary'
            data-clipboard-target='#history'
            onSuccess={() => replace(this.historyTable, this.originalTable)}
            onError={() => replace(this.historyTable, this.originalTable)}
          >
            Copy
          </Clipboard>
        </div>
      </div>
    )
  }

  render() {
    const {cases, referrals, screenings, onCopy} = this.props
    return (<div className='card-body no-pad-top'>
      <div className='table-responsive' id='history'
        ref={(history) => {
          this.historyTable = history
        }
        }
        onCopy={onCopy.bind(this)}
      >
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
  referrals: PropTypes.array,
  replace: PropTypes.func,
  screenings: PropTypes.array,
}
