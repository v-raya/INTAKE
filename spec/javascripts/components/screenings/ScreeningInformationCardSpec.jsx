import CardContainer from 'containers/screenings/CardContainer'
import ScreeningInformationFormContainer from 'containers/screenings/ScreeningInformationFormContainer'
import ScreeningInformationShowContainer from 'containers/screenings/ScreeningInformationShowContainer'
import {shallow} from 'enzyme'
import React from 'react'
import ScreeningInformationCard from 'screenings/ScreeningInformationCard'

describe('ScreeningInformationCard', () => {
  function render(props) {
    return shallow(<ScreeningInformationCard {...props} />)
  }

  it('renders a CardContainer with screening information title and id', () => {
    const container = render().find(CardContainer)
    expect(container.exists()).toEqual(true)

    const props = container.props()
    expect(props.title).toEqual('Screening Information')
    expect(props.id).toEqual('screening-information-card')
  })

  it('provides ScreeningInformationFormContainer as edit mode', () => {
    const container = render().find(CardContainer)
    expect(container.props().edit).toEqual(<ScreeningInformationFormContainer />)
  })

  it('provides ScreeningInformationShowContainer as show mode', () => {
    const container = render().find(CardContainer)
    expect(container.props().show).toEqual(<ScreeningInformationShowContainer />)
  })
})
