import CardContainer from 'containers/screenings/CardContainer'
import AllegationsFormContainer from 'containers/screenings/AllegationsFormContainer'
import AllegationsShowContainer from 'containers/screenings/AllegationsShowContainer'
import {shallow} from 'enzyme'
import React from 'react'
import AllegationsCard from 'screenings/AllegationsCard'

describe('AllegationsCard', () => {
  function render(props) {
    return shallow(<AllegationsCard {...props} />)
  }

  it('renders a CardContainer with allegations title and id', () => {
    const container = render().find(CardContainer)
    expect(container.exists()).toEqual(true)

    const props = container.props()
    expect(props.title).toEqual('Allegations')
    expect(props.id).toEqual('allegations-card')
  })

  it('provides AllegationsFormContainer as edit mode', () => {
    const container = render().find(CardContainer)
    expect(container.props().edit).toEqual(<AllegationsFormContainer />)
  })

  it('provides AllegationsShowContainer as show mode', () => {
    const container = render().find(CardContainer)
    expect(container.props().show).toEqual(<AllegationsShowContainer />)
  })
})
