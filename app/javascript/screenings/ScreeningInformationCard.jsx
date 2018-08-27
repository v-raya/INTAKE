import CardContainer from 'containers/screenings/CardContainer'
import ScreeningInformationFormContainer from 'containers/screenings/ScreeningInformationFormContainer'
import ScreeningInformationShowContainer from 'containers/screenings/ScreeningInformationShowContainer'
import React from 'react'

const ScreeningInformationCard = () =>
  <CardContainer
    title='Screening Information'
    id='screening-information-card'
    edit={<ScreeningInformationFormContainer />}
    show={<ScreeningInformationShowContainer />}
  />

export default ScreeningInformationCard
