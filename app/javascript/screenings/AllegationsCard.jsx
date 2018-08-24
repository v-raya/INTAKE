import CardContainer from 'containers/screenings/CardContainer'
import AllegationsFormContainer from 'containers/screenings/AllegationsFormContainer'
import AllegationsShowContainer from 'containers/screenings/AllegationsShowContainer'
import React from 'react'

const AllegationsCard = () =>
  <CardContainer
    title='Allegations'
    id='allegations-card'
    edit={<AllegationsFormContainer />}
    show={<AllegationsShowContainer />}
  />

export default AllegationsCard
