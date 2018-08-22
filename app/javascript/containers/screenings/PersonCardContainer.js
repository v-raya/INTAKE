import {connect} from 'react-redux'
import PersonCard from 'views/people/PersonCard'
import {
  getModeValueSelector,
  getPersonNamesSelector,
  selectDeceased,
  getPersonInformationFlagValuesSelector,
} from 'selectors/screening/personCardSelectors'
import {savePerson, deletePerson} from 'actions/personCardActions'
import {setPersonCardMode} from 'actions/screeningPageActions'
import {touchAllFields} from 'actions/peopleFormActions'

const mapStateToProps = (state, {personId}) => ({
  mode: getModeValueSelector(state, personId),
  editable: !state.getIn(['screening', 'referral_id']),
  deletable: !state.getIn(['screening', 'referral_id']),
  informationFlag: getPersonInformationFlagValuesSelector(state).get(personId),
  personName: getPersonNamesSelector(state).get(personId),
  informationPill: selectDeceased(state).get(personId) ? 'Deceased' : null,
})

export const mapDispatchToProps = (dispatch, {personId}) => ({
  onCancel: () => dispatch(setPersonCardMode(personId, 'show')),
  onDelete: () => dispatch(deletePerson(personId)),
  onEdit: () => dispatch(setPersonCardMode(personId, 'edit')),
  onSave: () => {
    dispatch(savePerson(personId))
    dispatch(touchAllFields(personId))
    dispatch(setPersonCardMode(personId, 'show'))
    window.location.hash = `#participants-card-${personId}`
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(PersonCard)
