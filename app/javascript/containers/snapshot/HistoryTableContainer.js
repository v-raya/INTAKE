import {connect} from 'react-redux'
import HistoryTable from 'views/history/HistoryTable'
import {
  getFormattedCasesSelector,
  getFormattedReferralsSelector,
} from 'selectors/screening/historyOfInvolvementSelectors'
import * as IntakeConfig from 'common/config'

const copyTable = (table, callback) => {
  // browsers have different functions for creating text ranges and selections
  if (document.createRange && window.getSelection) {
    const range = document.createRange()
    const selection = window.getSelection()
    selection.removeAllRanges()
    try {
      range.selectNodeContents(table)
      selection.addRange(range)
    } catch (e) {
      range.selectNode(table)
      selection.addRange(range)
    }
    document.execCommand('copy')
  } else if (document.body.createTextRange) {
    const range = document.body.createTextRange()
    range.moveToElementText(table)
    range.select()
    range.execCommand('copy')
  }
  callback()
}

const mapStateToProps = (state) => ({
  showCopyButton: IntakeConfig.jsClipboardSupported(),
  cases: getFormattedCasesSelector(state).toJS(),
  referrals: getFormattedReferralsSelector(state).toJS(),
  screenings: [],
  onCopy: (e, target, callback) => {
    const data = target.cloneNode(true)
    try {
      data.style.display = 'block'
      e.clipboardData.setData('text/html', data.outerHTML)
      e.preventDefault()
      e.stopPropagation()
      e.nativeEvent.stopImmediatePropagation()
    } catch (error) {
      if (callback) {
        callback()
      }
    }
  },
  friendlyCopy: (callback) => {
    const table = document.getElementById('history-copy-friendly')
    copyTable(table, callback)
  },
})

export default connect(mapStateToProps)(HistoryTable)
