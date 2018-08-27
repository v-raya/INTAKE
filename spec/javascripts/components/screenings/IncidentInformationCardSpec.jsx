import CardContainer from 'containers/screenings/CardContainer'
import IncidentInformationFormContainer from 'containers/screenings/IncidentInformationFormContainer'
import IncidentInformationShowContainer from 'containers/screenings/IncidentInformationShowContainer'
import {shallow} from 'enzyme'
import React from 'react'
import IncidentInformationCard from 'screenings/IncidentInformationCard'

describe('IncidentInformationCard', () => {
  function render(props) {
    return shallow(<IncidentInformationCard {...props} />)
  }

  it('renders a CardContainer with incident information title and id', () => {
    const container = render().find(CardContainer)
    expect(container.exists()).toEqual(true)

    const props = container.props()
    expect(props.title).toEqual('Incident Information')
    expect(props.id).toEqual('incident-information-card')
  })

  it('provides IncidentInformationFormContainer as edit mode', () => {
    const container = render().find(CardContainer)
    expect(container.props().edit).toEqual(<IncidentInformationFormContainer />)
  })

  it('provides IncidentInformationShowContainer as show mode', () => {
    const container = render().find(CardContainer)
    expect(container.props().show).toEqual(<IncidentInformationShowContainer />)
  })
})
