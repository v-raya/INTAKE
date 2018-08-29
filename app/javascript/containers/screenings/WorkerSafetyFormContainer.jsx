import WorkerSafetyForm from 'views/WorkerSafetyForm'
import {
  getAlertValuesSelector,
  getInformationValueSelector,
} from 'selectors/screening/workerSafetyFormSelectors'
import {setField} from 'actions/workerSafetyFormActions'
import {saveCard, clearCardEdits} from 'actions/screeningActions'
import SAFETY_ALERT from 'enums/SafetyAlert'
import selectOptions from 'utils/selectHelper'
import {connect} from 'react-redux'
import {setHash} from 'utils/navigation'

export const cardName = 'worker-safety-card'

const mapStateToProps = (state) => (
  {
    alertOptions: selectOptions(SAFETY_ALERT),
    safetyAlerts: {
      value: getAlertValuesSelector(state).toJS(),
    },
    safetyInformation: {
      value: getInformationValueSelector(state),
    },
  }
)

export const mapDispatchToProps = (dispatch, {onShow}) => ({
  onCancel: () => {
    dispatch(clearCardEdits(cardName))
    onShow()
    setHash('#worker-safety-card-anchor')
  },
  onChange: (fieldName, value) => dispatch(setField(fieldName, value)),
  onSave: () => {
    dispatch(saveCard(cardName))
    onShow()
    setHash('#worker-safety-card-anchor')
  },
  dispatch,
})

export default connect(mapStateToProps, mapDispatchToProps)(WorkerSafetyForm)
