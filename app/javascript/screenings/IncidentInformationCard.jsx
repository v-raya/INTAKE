import CardContainer from 'containers/screenings/CardContainer'
import IncidentInformationFormContainer from 'containers/screenings/IncidentInformationFormContainer'
import IncidentInformationShowContainer from 'containers/screenings/IncidentInformationShowContainer'
import React from 'react'

const IncidentInformationCard = () =>
  <CardContainer
    title='Incident Information'
    id='incident-information-card'
    edit={<IncidentInformationFormContainer />}
    show={<IncidentInformationShowContainer />}
  />

export default IncidentInformationCard
