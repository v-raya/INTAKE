import CardContainer from 'containers/screenings/CardContainer'
import WorkerSafetyFormContainer from 'containers/screenings/WorkerSafetyFormContainer'
import WorkerSafetyShowContainer from 'containers/screenings/WorkerSafetyShowContainer'
import React from 'react'

const WorkerSafetyCard = () =>
  <CardContainer
    title='Worker Safety'
    id='worker-safety-card'
    edit={<WorkerSafetyFormContainer />}
    show={<WorkerSafetyShowContainer />}
  />

export default WorkerSafetyCard
