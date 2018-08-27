import CardContainer from 'containers/screenings/CardContainer'
import NarrativeFormContainer from 'containers/screenings/NarrativeFormContainer'
import NarrativeShowContainer from 'containers/screenings/NarrativeShowContainer'
import {shallow} from 'enzyme'
import React from 'react'
import NarrativeCard from 'screenings/NarrativeCard'

describe('NarrativeCard', () => {
  function render(props) {
    return shallow(<NarrativeCard {...props} />)
  }

  it('renders a CardContainer with narrative title and id', () => {
    const container = render().find(CardContainer)
    expect(container.exists()).toEqual(true)

    const props = container.props()
    expect(props.title).toEqual('Narrative')
    expect(props.id).toEqual('narrative-card')
  })

  it('provides NarrativeFormContainer as edit mode', () => {
    const container = render().find(CardContainer)
    expect(container.props().edit).toEqual(<NarrativeFormContainer />)
  })

  it('provides NarrativeShowContainer as show mode', () => {
    const container = render().find(CardContainer)
    expect(container.props().show).toEqual(<NarrativeShowContainer />)
  })
})
