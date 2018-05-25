import React from 'react'
import {shallow} from 'enzyme'
import AlertInfoMessage from 'common/AlertInfoMessage'

describe('AlertInfoMessage', () => {
  it('renders the message text passed to it', () => {
    const messageText = 'Help me Obi-Wan Kenobi'
    const component = shallow(<AlertInfoMessage message={messageText} />, {disableLifecycleMethods: true})
    expect(component.text()).toEqual(messageText)
  })
  it('renders the jsx passed to it', () => {
    const jsx = <div>This is test</div>
    const component = shallow(<AlertInfoMessage message={jsx} />, {disableLifecycleMethods: true})
    expect(component.html()).toContain('<div>This is test</div>')
  })
})
