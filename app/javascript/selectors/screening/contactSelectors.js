import {getScreeningSelector} from 'selectors/screeningSelectors'
import {getPeopleSelector} from 'selectors/screening/personFormSelectors'
import {Map} from 'immutable'
import {systemCodeIdValue, selectCommunicationMethods} from 'selectors/systemCodeSelectors'
import COMMUNICATION_METHOD from 'enums/CommunicationMethod'

export const getContactPayloadSelector = (state) => {
  //predefined purpose: 'Consult with Collateral'
  const purpose = '439'
  //predefined status: 'Completed'
  const status = 'C'
  //predefined contact location: 'CWS Office'
  const location = '415'
  const screening = getScreeningSelector(state)
  const people = getPeopleSelector(state).map((person) => (
    {
      legacy_descriptor: person.getIn(['legacy_descriptor', 'value']),
      first_name: person.getIn(['first_name', 'value']),
      last_name: person.getIn(['last_name', 'value']),
      middle_name: person.getIn(['middle_name', 'value']),
      name_suffix: person.getIn(['name_suffix', 'value']),
    }))
  const communicationMethod = COMMUNICATION_METHOD[screening.get('communication_method')]
  const contactPayload = {
    contact: {
      started_at: screening.get('started_at'),
      ended_at: screening.get('ended_at'),
      purpose: purpose,
      communication_method: systemCodeIdValue(communicationMethod, selectCommunicationMethods(state)),
      status: status,
      location: location,
      note: screening.get('report_narrative'),
      people: people,
    },
  }
  return contactPayload
}
