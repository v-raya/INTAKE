import {connect} from 'react-redux'
import ScreeningDecisionShow from 'views/ScreeningDecisionShow'
import {
  getDecisionSelector,
  getDecisionDetailSelector,
  getRestrictionRationaleSelector,
  getAdditionalInfoRequiredSelector,
  getAdditionalInformationSelector,
  selectContactReference,
} from 'selectors/screening/decisionShowSelectors'
import {
  getDecisionAlertErrorMessageSelector,
} from 'selectors/screening/decisionFormSelectors'
import {getScreeningSelector} from 'selectors/screeningSelectors'
import * as IntakeConfig from 'common/config'
import {getScreeningIsReadOnlySelector} from 'selectors/screeningSelectors'
import _ from 'lodash'

const mapStateToProps = (state, ownProps) => {
  let props = {
    alertErrorMessage: getDecisionAlertErrorMessageSelector(state),
    accessRestriction: {
      value: _.capitalize(getScreeningSelector(state).get('access_restrictions')),
    },
    additionalInformation: getAdditionalInformationSelector(state).toJS(),
    decision: getDecisionSelector(state).toJS(),
    decisionDetail: getDecisionDetailSelector(state).toJS(),
    restrictionRationale: getRestrictionRationaleSelector(state).toJS(),
    screeningContactReference: selectContactReference(state).toJS(),
    sdmPath: IntakeConfig.sdmPath(),
    isAdditionalInfoRequired: getAdditionalInfoRequiredSelector(state),
  }
  if (!getScreeningIsReadOnlySelector(state)) {
    props = {
      ...props,
      onEdit: ownProps.toggleMode,
    }
  }
  return props
}

export default connect(mapStateToProps)(ScreeningDecisionShow)
