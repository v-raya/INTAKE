import CardContainer from 'containers/screenings/CardContainer'
import DecisionFormContainer from 'containers/screenings/DecisionFormContainer'
import DecisionShowContainer from 'containers/screenings/DecisionShowContainer'
import {shallow} from 'enzyme'
import React from 'react'
import DecisionCard from 'screenings/DecisionCard'

describe('DecisionCard', () => {
  function render(props) {
    return shallow(<DecisionCard {...props} />)
  }

  it('renders a CardContainer with decision title and id', () => {
    const container = render().find(CardContainer)
    expect(container.exists()).toEqual(true)

    const props = container.props()
    expect(props.title).toEqual('Decision')
    expect(props.id).toEqual('decision-card')
  })

  it('provides DecisionFormContainer as edit mode', () => {
    const container = render().find(CardContainer)
    expect(container.props().edit).toEqual(<DecisionFormContainer />)
  })

  it('provides DecisionShowContainer as show mode', () => {
    const container = render().find(CardContainer)
    expect(container.props().show).toEqual(<DecisionShowContainer />)
  })
})
