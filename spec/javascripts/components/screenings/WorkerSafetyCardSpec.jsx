import CardContainer from 'containers/screenings/CardContainer'
import WorkerSafetyFormContainer from 'containers/screenings/WorkerSafetyFormContainer'
import WorkerSafetyShowContainer from 'containers/screenings/WorkerSafetyShowContainer'
import {shallow} from 'enzyme'
import React from 'react'
import WorkerSafetyCard from 'screenings/WorkerSafetyCard'

describe('WorkerSafetyCard', () => {
  function render(props) {
    return shallow(<WorkerSafetyCard {...props} />)
  }

  it('renders a CardContainer with worker safety title and id', () => {
    const container = render().find(CardContainer)
    expect(container.exists()).toEqual(true)

    const props = container.props()
    expect(props.title).toEqual('Worker Safety')
    expect(props.id).toEqual('worker-safety-card')
  })

  it('provides WorkerSafetyFormContainer as edit mode', () => {
    const container = render().find(CardContainer)
    expect(container.props().edit).toEqual(<WorkerSafetyFormContainer />)
  })

  it('provides WorkerSafetyShowContainer as show mode', () => {
    const container = render().find(CardContainer)
    expect(container.props().show).toEqual(<WorkerSafetyShowContainer />)
  })
})
