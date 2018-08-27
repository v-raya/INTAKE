import CardContainer from 'containers/screenings/CardContainer'
import DecisionFormContainer from 'containers/screenings/DecisionFormContainer'
import DecisionShowContainer from 'containers/screenings/DecisionShowContainer'
import React from 'react'

const DecisionCard = () =>
  <CardContainer
    title='Decision'
    id='decision-card'
    edit={<DecisionFormContainer />}
    show={<DecisionShowContainer />}
  />

export default DecisionCard
