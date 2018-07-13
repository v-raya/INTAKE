import {connect} from 'react-redux'
import HistoryTable from 'views/history/HistoryTable'
import {
  getFormattedCasesSelector,
  getFormattedReferralsSelector,
} from 'selectors/screening/historyOfInvolvementSelectors'
import * as IntakeConfig from 'common/config'

const mapStateToProps = (state) => ({
  showCopyButton: IntakeConfig.jsClipboardSupported(),
  cases: getFormattedCasesSelector(state).toJS(),
  referrals: getFormattedReferralsSelector(state).toJS(),
  screenings: [],
  // To make the copied table fit in MS Word, we have to temporarily restyle it.
  formatTable: (copyContent) => {
    Array.from(copyContent.querySelectorAll('table, th, td')).forEach((el) => (el.style.border = '1px solid black'))
    Array.from(copyContent.querySelectorAll('table')).forEach((el) => {
      el.style.borderCollapse = 'collapse'
      el.style.fontSize = '12px'
    })
    Array.from(copyContent.querySelectorAll('.reporter')).forEach((reporter) => (reporter.parentNode.removeChild(reporter)))
    return copyContent
  },
  replace: (target, value) => {
    if (value && target.parentNode) {
      target.parentNode.replaceChild(value, target)
    }
  },
})

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {formatTable} = stateProps
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    onCopy: (e, fallback) => {
      const copyData = formatTable(e.target.cloneNode(true))
      try {
        e.clipboardData.setData('text/html', copyData.outerHTML)
        e.preventDefault()
      } catch (error) {
        fallback()
      }
    },
  }
}

export default connect(mapStateToProps, null, mergeProps)(HistoryTable)
