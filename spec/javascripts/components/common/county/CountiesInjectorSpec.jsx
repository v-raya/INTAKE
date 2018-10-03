import {mount} from 'enzyme'
import React from 'react'
import {createMockStore} from 'redux-test-utils'
import {fromJS} from 'immutable'
import CountiesInjector from 'common/county/CountiesInjector'

const MyComponent = () => (<div>Hello World</div>)
MyComponent.displayName = 'MyComponent'

describe('CountiesInjector', () => {
  const render = (child, state) => {
    const store = createMockStore(state)
    const context = {store}
    return mount(<CountiesInjector>{child}</CountiesInjector>, {context})
  }

  describe('with counties loaded', () => {
    const counties = [
      {code: '231', value: 'Alameda'},
      {code: '232', value: 'Alpine'},
      {code: '233', value: 'Amador'},
      {code: '234', value: 'Butte'},
      {code: '1234', value: 'State of California'},
    ]
    const state = fromJS({systemCodes: {counties}})

    it('renders the child element', () => {
      const component = render(<MyComponent />, state)
      expect(component.find('MyComponent').text()).toEqual('Hello World')
    })

    it('adds list of counties without State of California to the child', () => {
      const component = render(<MyComponent />, state)
      expect(component.find('MyComponent').props().counties).toEqual([
        {code: '231', value: 'Alameda'},
        {code: '232', value: 'Alpine'},
        {code: '233', value: 'Amador'},
        {code: '234', value: 'Butte'},
      ])
    })
  })

  describe('before counties are loaded', () => {
    const state = fromJS({systemCodes: {counties: []}})

    it('renders the child element', () => {
      const component = render(<MyComponent />, state)
      expect(component.find('MyComponent').text()).toEqual('Hello World')
    })

    it('adds an empty list of counties to the child', () => {
      const component = render(<MyComponent />, state)
      expect(component.find('MyComponent').props().counties).toEqual([])
    })
  })
})
