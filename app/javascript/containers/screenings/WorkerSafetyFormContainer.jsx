import WorkerSafetyForm from 'views/WorkerSafetyForm'
import {
  getAlertValuesSelector,
  getInformationValueSelector,
} from 'selectors/screening/workerSafetyFormSelectors'
import {setField} from 'actions/workerSafetyFormActions'
import {saveCard, clearCardEdits} from 'actions/screeningActions'
import {setCardMode, SHOW_MODE} from 'actions/screeningPageActions'
import SAFETY_ALERT from 'enums/SafetyAlert'
import selectOptions from 'utils/selectHelper'
import {connect} from 'react-redux'

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

export const mapDispatchToProps = (dispatch) => ({
  onCancel: () => {
    dispatch(clearCardEdits(cardName))
    dispatch(setCardMode(cardName, SHOW_MODE))
    window.location.hash = '#worker-safety-card-anchor'
  },
  onChange: (fieldName, value) => dispatch(setField(fieldName, value)),
  onSave: () => {
    dispatch(saveCard(cardName))
    dispatch(setCardMode(cardName, SHOW_MODE))
    window.location.hash = '#worker-safety-card-anchor'
  },
  dispatch,
})

export default connect(mapStateToProps, mapDispatchToProps)(WorkerSafetyForm)
