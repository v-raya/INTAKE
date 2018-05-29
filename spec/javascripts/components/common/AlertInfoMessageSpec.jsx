import React from 'react'
import {shallow} from 'enzyme'
import AlertInfoMessage from 'common/AlertInfoMessage'
import {SafelySurrenderedBabyMessage} from 'views/ScreeningInformationHelpTextBox'

describe('AlertInfoMessage', () => {
  it('renders the message text passed to it', () => {
    const messageText = 'Help me Obi-Wan Kenobi'
    const component = shallow(<AlertInfoMessage message={messageText} />, {disableLifecycleMethods: true})
    expect(component.text()).toEqual(messageText)
  })

  it('renders the conponent passed to it', () => {
    const component = shallow(<AlertInfoMessage message={<SafelySurrenderedBabyMessage/>} />, {disableLifecycleMethods: true})
    expect(component.html()).toContain('<li>Complete all other fields marked as required.</li>')
  })
})
