import React from 'react'
import {shallow} from 'enzyme'
import GrouperHeading from 'common/GrouperHeading'

describe('GrouperHeading', () => {
  it('is an H4 heading', () => {
    const root = shallow(<GrouperHeading text='hello world' />)
    expect(root.find('h4').exists()).toEqual(true)
  })

  it('renders with the given text', () => {
    const text = 'Safely Surrendered Baby Information'
    const root = shallow(<GrouperHeading text={text} />)
    expect(root.find('h4').text()).toEqual(text)
  })

  it('has a grouper heading class', () => {
    const root = shallow(<GrouperHeading text='Types of Banana' />)
    expect(root.find('h4').props().className).toContain('grouper')
  })
})
