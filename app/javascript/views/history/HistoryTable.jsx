import React from 'react'
import PropTypes from 'prop-types'
import CaseView from 'views/history/CaseView'
import ReferralView from 'views/history/ReferralView'
import ScreeningView from 'views/history/ScreeningView'
import CopyableCaseView from 'views/history/copyable/CaseView'
import CopyableReferralView from 'views/history/copyable/ReferralView'
import CopyableScreeningView from 'views/history/copyable/ScreeningView'
import Clipboard from 'react-clipboard.js'

const offset = 1
const toOneBasedNumbering = (i) => i + offset

export default class HistoryTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {copyFriendly: false}
  }

  componentDidUpdate() {
    const {copyFriendly} = this.state
    const {friendlyCopy} = this.props
    if (copyFriendly) {
      friendlyCopy(() => this.setState({copyFriendly: false}))
    }
  }

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
    return (
      <div className='row'>
        <div className='centered' id='copy-button'>
          <Clipboard
            className='btn btn-primary'
            data-clipboard-target='#history'
          >
            Copy
          </Clipboard>
        </div>
      </div>
    )
  }

  renderTable() {
    const {cases, referrals, screenings, onCopy} = this.props
    return (
      <div className='table-responsive' id='history'
        onCopy={(e) => (
          onCopy(e, this.copyableTable, () => {
            e.preventDefault()
            e.stopPropagation()
            e.nativeEvent.stopImmediatePropagation()
            this.setState({copyFriendly: true})
          }))}
        onError={() => this.setState({copyFriendly: false})}
      >
        <table className='table history-table ordered-table' >
          {this.renderColGroup()}
          {this.renderTHead()}
          <tbody>
            {screenings.map((screening, index) => <ScreeningView {...screening} index={toOneBasedNumbering(index)} key={index} />)}
            {referrals.map((referral, index) => <ReferralView {...referral} index={toOneBasedNumbering(index)} key={index} />)}
            {cases.map((hoiCase, index) => <CaseView {...hoiCase} index={toOneBasedNumbering(index)} key={index} />)}
          </tbody>
        </table>
      </div>)
  }

  renderCopyFriendlyTable() {
    const {cases, referrals, screenings} = this.props
    const {copyFriendly} = this.state
    const display = copyFriendly ? 'block' : 'none'
    return (
      <div className= 'copy-friendly' id='history-copy-friendly' style={{display}}
        ref={(history) => { this.copyableTable = history }}
        onError={() => this.setState({copyFriendly: false})}
      >
        <table className='copy-friendly' style={{display: 'block', border: '1px solid black'}}>
          {this.renderColGroup()}
          {this.renderTHead()}
          <tbody>
            {screenings.map((screening, index) => <CopyableScreeningView {...screening} index={toOneBasedNumbering(index)} key={index} />)}
            {referrals.map((referral, index) => <CopyableReferralView {...referral} index={toOneBasedNumbering(index)} key={index} />)}
            {cases.map((hoiCase, index) => <CopyableCaseView {...hoiCase} index={toOneBasedNumbering(index)} key={index} />)}
          </tbody>
        </table>
      </div>)
  }

  render() {
    return (<div className='card-body no-pad-top'>
      {this.renderTable()}
      {this.renderCopyFriendlyTable()}
      {this.renderButtonRow()}
    </div>
    )
  }
}

HistoryTable.propTypes = {
  cases: PropTypes.array,
  friendlyCopy: PropTypes.func,
  onCopy: PropTypes.func,
  referrals: PropTypes.array,
  screenings: PropTypes.array,
}
