import React from 'react'
import {shallow} from 'enzyme'
import SafelySurrenderedBabyShow from 'views/people/SafelySurrenderedBabyShow'

describe('SafelySurrenderedBabyShow', () => {
  const render = () => shallow(<SafelySurrenderedBabyShow />)

  it('renders hello', () => {
    const view = render()
    expect(view.html()).toContain('<div>hello</div>')
  })

  it('renders a show field', () => {
    const view = render()
    expect(view.find('ShowField').exists()).toBe(true)
  })
})
