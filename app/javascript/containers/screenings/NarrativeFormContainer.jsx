import NarrativeForm from 'views/NarrativeForm'
import {
  getReportNarrativeValueSelector,
  getVisibleErrorsSelector,
} from 'selectors/screening/narrativeFormSelectors'
import {setField, touchField, touchAllFields} from 'actions/narrativeFormActions'
import {saveCard, clearCardEdits} from 'actions/screeningActions'
import {setCardMode, SHOW_MODE} from 'actions/screeningPageActions'
import {connect} from 'react-redux'

export const cardName = 'narrative-card'

const mapStateToProps = (state) => (
  {
    reportNarrative: {
      value: getReportNarrativeValueSelector(state),
      errors: getVisibleErrorsSelector(state).get('report_narrative').toJS(),
    },
  }
)

export const mapDispatchToProps = (dispatch) => ({
  onBlur: (fieldName) => dispatch(touchField(fieldName)),
  onCancel: () => {
    dispatch(clearCardEdits(cardName))
    dispatch(touchAllFields())
    dispatch(setCardMode(cardName, SHOW_MODE))
    window.location.hash = '#narrative-card-anchor'
  },
  onChange: (fieldName, value) => dispatch(setField(fieldName, value)),
  onSave: () => {
    dispatch(saveCard(cardName))
    dispatch(touchAllFields())
    dispatch(setCardMode(cardName, SHOW_MODE))
    window.location.hash = '#narrative-card-anchor'
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(NarrativeForm)
