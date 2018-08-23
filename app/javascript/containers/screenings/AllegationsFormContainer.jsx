import {connect} from 'react-redux'
import AllegationsForm from 'views/AllegationsForm'
import {
  getAllegationTypesSelector,
  getFormattedAllegationsSelector,
  getAllegationsRequiredValueSelector,
  getAllegationsAlertErrorMessageSelector,
} from 'selectors/screening/allegationsFormSelectors'
import {saveCard, clearCardEdits} from 'actions/screeningActions'
import {setAllegationTypes} from 'actions/allegationsFormActions'
import {setHash} from 'utils/navigation'

export const cardName = 'allegations-card'

const mapStateToProps = (state) => (
  {
    alertErrorMessage: getAllegationsAlertErrorMessageSelector(state),
    allegations: getFormattedAllegationsSelector(state).toJS(),
    allegationTypes: getAllegationTypesSelector(state).toJS(),
    required: getAllegationsRequiredValueSelector(state),
  }
)

export const mapDispatchToProps = (dispatch, {onShow}) => ({
  onCancel: () => {
    dispatch(clearCardEdits(cardName))
    onShow()
    setHash('#allegations-card-anchor')
  },
  onChange: (props) => {
    dispatch(setAllegationTypes(props))
  },
  onSave: () => {
    dispatch(saveCard(cardName))
    onShow()
    setHash('#allegations-card-anchor')
  },
  dispatch,
})

export default connect(mapStateToProps, mapDispatchToProps)(AllegationsForm)
