import CardContainer from 'containers/screenings/CardContainer'
import NarrativeFormContainer from 'containers/screenings/NarrativeFormContainer'
import NarrativeShowContainer from 'containers/screenings/NarrativeShowContainer'
import React from 'react'

const NarrativeCard = () =>
  <CardContainer
    title='Narrative'
    id='narrative-card'
    edit={<NarrativeFormContainer />}
    show={<NarrativeShowContainer />}
  />

export default NarrativeCard
