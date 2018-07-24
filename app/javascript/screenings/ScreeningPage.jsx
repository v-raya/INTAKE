import * as screeningActions from 'actions/screeningActions'
import * as personCardActions from 'actions/personCardActions'
import {setPageMode} from 'actions/screeningPageActions'
import {fetchHistoryOfInvolvements, clearHistoryOfInvolvement} from 'actions/historyOfInvolvementActions'
import {clearRelationships} from 'actions/relationshipsActions'
import PersonCardView from 'screenings/PersonCardView'
import PropTypes from 'prop-types'
import React from 'react'
import RelationshipsCardContainer from 'screenings/RelationshipsCardContainer'
import CardContainer from 'containers/screenings/CardContainer'
import {Link} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import HistoryOfInvolvementContainer from 'containers/screenings/HistoryOfInvolvementContainer'
import HistoryTableContainer from 'containers/screenings/HistoryTableContainer'
import EmptyHistory from 'views/history/EmptyHistory'
import PersonSearchFormContainer from 'containers/common/PersonSearchFormContainer'
import ErrorDetail from 'common/ErrorDetail'
import ScreeningInformationFormContainer from 'containers/screenings/ScreeningInformationFormContainer'
import ScreeningInformationShowContainer from 'containers/screenings/ScreeningInformationShowContainer'
import ScreeningSideBar from 'screenings/ScreeningSideBar'
import NarrativeFormContainer from 'containers/screenings/NarrativeFormContainer'
import NarrativeShowContainer from 'containers/screenings/NarrativeShowContainer'
import IncidentInformationFormContainer from 'containers/screenings/IncidentInformationFormContainer'
import AllegationsFormContainer from 'containers/screenings/AllegationsFormContainer'
import AllegationsShowContainer from 'containers/screenings/AllegationsShowContainer'
import IncidentInformationShowContainer from 'containers/screenings/IncidentInformationShowContainer'
import WorkerSafetyFormContainer from 'containers/screenings/WorkerSafetyFormContainer'
import WorkerSafetyShowContainer from 'containers/screenings/WorkerSafetyShowContainer'
import CrossReportFormContainer from 'containers/screenings/CrossReportFormContainer'
import CrossReportShowContainer from 'containers/screenings/CrossReportShowContainer'
import DecisionFormContainer from 'containers/screenings/DecisionFormContainer'
import DecisionShowContainer from 'containers/screenings/DecisionShowContainer'
import PageHeader from 'common/PageHeader'
import {getScreeningSubmissionErrorsSelector, getApiValidationErrorsSelector} from 'selectors/errorsSelectors'
import {selectParticipants} from 'selectors/participantSelectors'
import {getScreeningTitleSelector, getScreeningIsReadOnlySelector} from 'selectors/screeningSelectors'
import {
  getAllCardsAreSavedValueSelector,
  getScreeningHasErrorsSelector,
  getPeopleHaveErrorsSelector,
} from 'selectors/screening/screeningPageSelectors'
import {selectStaffId} from 'selectors/userInfoSelectors'
import {logEvent} from 'utils/analytics'

const isDuplicatePerson = (participants, personOnScreening) => (
  participants
    .filter((participant) => participant.legacy_id)
    .some((x) => x.legacy_id === personOnScreening.legacy_descriptor.legacy_id)
)

export class ScreeningPage extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  componentDidMount() {
    const {
      actions: {
        setPageMode,
        fetchScreening,
        fetchHistoryOfInvolvements,
      },
      params: {mode, id},
    } = this.props
    if (id) {
      setPageMode(mode || 'show')
      fetchScreening(id)
      fetchHistoryOfInvolvements('screenings', id)
    } else { fetchScreening(null) }
    if (this.props.staffId !== undefined) {
      logEvent('screeningPage', {
        staffId: this.props.staffId,
        action: 'visited',
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.staffId !== prevProps.staffId) {
      if (this.props.staffId !== undefined) {
        logEvent('screeningPage', {
          staffId: this.props.staffId,
          action: 'visited',
        })
      }
    }
  }

  componentWillUnmount() {
    const {
      actions: {
        clearHistoryOfInvolvement,
        clearRelationships,
        clearPeople,
        clearScreening,
      },
    } = this.props
    clearHistoryOfInvolvement()
    clearRelationships()
    clearPeople()
    clearScreening()
  }

  onSelectPerson(person) {
    const {participants, params: {id}, actions: {createPerson}} = this.props
    const personOnScreening = {
      screening_id: id,
      legacy_descriptor: {
        legacy_id: person.legacyDescriptor && person.legacyDescriptor.legacy_id,
        legacy_source_table: person.legacyDescriptor && person.legacyDescriptor.legacy_table_name,
      },
    }
    if (!isDuplicatePerson(participants, personOnScreening)) {
      createPerson(personOnScreening)
    }
  }

  submitButton() {
    const {editable, disableSubmitButton, params: {id}, actions: {submitScreening}} = this.props
    if (editable) {
      return (
        <button type='button'
          className='btn primary-btn pull-right'
          disabled={disableSubmitButton}
          onClick={() => submitScreening(id)}
        >
          Submit
        </button>
      )
    } else {
      return (<div />)
    }
  }

  renderCard(title, id, edit, show) {
    const props = {title, id, edit, show}
    return (<CardContainer {...props} />)
  }

  renderScreeningInformationCard() {
    return this.renderCard(
      'Screening Information',
      'screening-information-card',
      <ScreeningInformationFormContainer />,
      <ScreeningInformationShowContainer />)
  }

  renderPersonSearchForm() {
    return (
      <PersonSearchFormContainer
        onSelect={(person) => this.onSelectPerson(person)}
        searchPrompt='Search for any person (Children, parents, reporters, alleged perpetrators...)'
        canCreateNewPerson={true}
      />)
  }

  renderNarrativeCard() {
    return this.renderCard('Narrative', 'narrative-card', <NarrativeFormContainer/>, <NarrativeShowContainer/>)
  }

  renderIncidentInformationCard() {
    return this.renderCard('Incident Information', 'incident-information-card', <IncidentInformationFormContainer/>, <IncidentInformationShowContainer/>)
  }

  renderAllegationsCard() {
    return this.renderCard('Allegations', 'allegations-card', <AllegationsFormContainer/>, <AllegationsShowContainer/>)
  }

  renderWorkerSafetyCard() {
    return this.renderCard('Worker Safety', 'worker-safety-card', <WorkerSafetyFormContainer/>, <WorkerSafetyShowContainer/>)
  }

  renderCrossReportCard() {
    return this.renderCard('Cross Report', 'cross-report-card', <CrossReportFormContainer/>, <CrossReportShowContainer/>)
  }

  renderDecisionCard() {
    return this.renderCard('Decision', 'decision-card', <DecisionFormContainer/>, <DecisionShowContainer/>)
  }

  renderScreeningFooter() {
    const {mode, editable} = this.props
    return mode === 'show' && (
      <div>
        <Link to='/' className='gap-right'>Home</Link>
        {editable && <Link to={`/screenings/${this.props.params.id}/edit`}>Edit</Link>}
      </div>
    )
  }

  renderBody() {
    const {referralId, editable, hasApiValidationErrors, submitReferralErrors} = this.props
    return (
      <div className='col-xs-8 col-md-9'>
        <h1>{referralId && `Referral #${referralId}`}</h1>
        {hasApiValidationErrors && <ErrorDetail errors={submitReferralErrors} />}
        {this.renderScreeningInformationCard()}
        {editable && this.renderPersonSearchForm()}
        {this.props.participants.map(({id}) => <PersonCardView key={id} personId={id} />)}
        {this.renderNarrativeCard()}
        {this.renderIncidentInformationCard()}
        {this.renderAllegationsCard()}
        <RelationshipsCardContainer />
        {this.renderWorkerSafetyCard()}
        <HistoryOfInvolvementContainer empty={<EmptyHistory />} notEmpty={<HistoryTableContainer />} />
        {this.renderCrossReportCard()}
        {this.renderDecisionCard()}
        {this.renderScreeningFooter()}
      </div>
    )
  }

  renderScreening() {
    const {loaded, participants} = this.props

    if (loaded) {
      return (
        <div className='row'>
          <ScreeningSideBar participants={participants} />
          {this.renderBody()}
        </div>
      )
    }
    return (<div />)
  }

  render() {
    return (
      <div>
        <div>
          <PageHeader pageTitle={this.props.screeningTitle} button={this.submitButton()} />
        </div>
        <div className='container'>
          {this.renderScreening()}
        </div>
      </div>
    )
  }
}

ScreeningPage.propTypes = {
  actions: PropTypes.object.isRequired,
  disableSubmitButton: PropTypes.bool,
  editable: PropTypes.bool,
  hasApiValidationErrors: PropTypes.bool,
  loaded: PropTypes.bool,
  mode: PropTypes.string.isRequired,
  params: PropTypes.object.isRequired,
  participants: PropTypes.array.isRequired,
  reference: PropTypes.string,
  referralId: PropTypes.string,
  screeningTitle: PropTypes.string,
  staffId: PropTypes.string,
  submitReferralErrors: PropTypes.array,
}

ScreeningPage.defaultProps = {
  mode: 'show',
}

export function mapStateToProps(state, _ownProps) {
  return {
    disableSubmitButton: !getAllCardsAreSavedValueSelector(state) ||
      getScreeningHasErrorsSelector(state) ||
      getPeopleHaveErrorsSelector(state),
    editable: !getScreeningIsReadOnlySelector(state),
    loaded: state.getIn(['screening', 'fetch_status']) === 'FETCHED',
    mode: state.getIn(['screeningPage', 'mode']),
    participants: selectParticipants(state).toJS(),
    reference: state.getIn(['screening', 'reference']),
    referralId: state.getIn(['screening', 'referral_id']),
    hasApiValidationErrors: Boolean(getApiValidationErrorsSelector(state).size),
    screeningTitle: getScreeningTitleSelector(state),
    submitReferralErrors: getScreeningSubmissionErrorsSelector(state).toJS(),
    staffId: selectStaffId(state),
  }
}

function mapDispatchToProps(dispatch, _ownProps) {
  const actions = {
    setPageMode,
    fetchHistoryOfInvolvements,
    clearHistoryOfInvolvement,
    clearRelationships,
    ...personCardActions,
    ...screeningActions,
  }
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreeningPage)
