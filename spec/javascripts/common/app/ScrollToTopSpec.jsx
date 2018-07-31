import {mount} from 'enzyme'
import React from 'react'
import {ScrollToTop} from 'common/app/ScrollToTop'

describe('ScrollToTop', () => {
  let root
  beforeEach(() => {
    // Must use mount, as refs are important part of functionality
    root = mount(<ScrollToTop location={{path: '/'}}>Hello, World</ScrollToTop>)
  })

  it('renders a div and keeps it as a ref', () => {
    const div = root.find('div')
    expect(root.find('div').exists()).toEqual(true)
    expect(root.instance().focusTarget.current).toEqual(div.instance())
  })

  it('can give focus to the div', () => {
    expect(root.find('div').props().tabIndex).toEqual('-1')
  })

  it('renders children within the div', () => {
    expect(root.find('div').props().children).toEqual('Hello, World')
  })

  it('scrolls to top after update when location changes', () => {
    const scrollTo = spyOn(window, 'scrollTo')
    root.setProps({location: {path: '/new_page'}})
    expect(scrollTo).toHaveBeenCalledWith(0, 0)
  })

  it('does not scroll to top after update when location is the same', () => {
    const scrollTo = spyOn(window, 'scrollTo')
    root.setProps({children: 'Goodbye, Cruel World'})
    expect(scrollTo).not.toHaveBeenCalled()
  })

  it('focuses on the div after update when location changes', () => {
    const focus = spyOn(root.instance().focusTarget.current, 'focus')
    root.setProps({location: {path: '/new_page'}})
    expect(focus).toHaveBeenCalled()
  })

  it('does not focus on the div after update when location is the same', () => {
    const focus = spyOn(root.instance().focusTarget.current, 'focus')
    root.setProps({children: 'Goodbye, Cruel World'})
    expect(focus).not.toHaveBeenCalled()
  })

  it('lets the browser handle scroll and focus when there is a hash', () => {
    const scrollTo = spyOn(window, 'scrollTo')
    const focus = spyOn(root.instance().focusTarget.current, 'focus')

    root.setProps({location: {hash: '#from_none_to_one'}})
    root.setProps({location: {hash: '#from_one_to_another'}})

    expect(scrollTo).not.toHaveBeenCalled()
    expect(focus).not.toHaveBeenCalled()

    root.setProps({location: {hash: ''}})
    expect(scrollTo).toHaveBeenCalled()
    expect(focus).toHaveBeenCalled()
  })
})
