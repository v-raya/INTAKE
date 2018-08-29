import CardContainer from 'containers/screenings/CardContainer'
import CrossReportFormContainer from 'containers/screenings/CrossReportFormContainer'
import CrossReportShowContainer from 'containers/screenings/CrossReportShowContainer'
import {shallow} from 'enzyme'
import React from 'react'
import CrossReportCard from 'screenings/CrossReportCard'

describe('CrossReportCard', () => {
  function render(props) {
    return shallow(<CrossReportCard {...props} />)
  }

  it('renders a CardContainer with cross report title and id', () => {
    const container = render().find(CardContainer)
    expect(container.exists()).toEqual(true)

    const props = container.props()
    expect(props.title).toEqual('Cross Report')
    expect(props.id).toEqual('cross-report-card')
  })

  it('provides CrossReportFormContainer as edit mode', () => {
    const container = render().find(CardContainer)
    expect(container.props().edit).toEqual(<CrossReportFormContainer />)
  })

  it('provides CrossReportShowContainer as show mode', () => {
    const container = render().find(CardContainer)
    expect(container.props().show).toEqual(<CrossReportShowContainer />)
  })
})
