import CardContainer from 'containers/screenings/CardContainer'
import CrossReportFormContainer from 'containers/screenings/CrossReportFormContainer'
import CrossReportShowContainer from 'containers/screenings/CrossReportShowContainer'
import React from 'react'

const CrossReportCard = () =>
  <CardContainer
    title='Cross Report'
    id='cross-report-card'
    edit={<CrossReportFormContainer />}
    show={<CrossReportShowContainer />}
  />

export default CrossReportCard
