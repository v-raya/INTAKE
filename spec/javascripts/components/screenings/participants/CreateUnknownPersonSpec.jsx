import CreateUnknownPerson from 'screenings/CreateUnknownPerson'
import React from 'react'
import {shallow} from 'enzyme'

describe('CreateUnknownPerson', () => {
  const component = shallow(
    <CreateUnknownPerson/>, {disableLifecycleMethods: true}
  )

  it('renders the create new person button', () => {
    expect(component.find('button').text()).toContain('Create a new person')
  })
})
