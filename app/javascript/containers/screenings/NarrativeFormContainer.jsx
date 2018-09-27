import NarrativeForm from 'views/NarrativeForm'
import {
  getReportNarrativeValueSelector,
  getVisibleErrorsSelector,
} from 'selectors/screening/narrativeFormSelectors'
import {setField, touchField, touchAllFields} from 'actions/narrativeFormActions'
import {saveCard, clearCardEdits} from 'actions/screeningActions'
import {connect} from 'react-redux'
import {mapDispatchToPropsFactory} from 'utils/connectors'

export const cardName = 'narrative-card'

const mapStateToProps = (state) => (
  {
    reportNarrative: {
      value: getReportNarrativeValueSelector(state),
      errors: getVisibleErrorsSelector(state).get('report_narrative').toJS(),
    },
  }
)

export const mapDispatchToProps = mapDispatchToPropsFactory({
  cardName,
  setField,
  touchAllFields,
  touchField,
  saveCard,
  clearCardEdits,
})

export default connect(mapStateToProps, mapDispatchToProps)(NarrativeForm)
