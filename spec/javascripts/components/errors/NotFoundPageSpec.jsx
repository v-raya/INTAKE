import React from 'react'
import NotFoundPage from 'errors/NotFoundPage'
import {shallow} from 'enzyme'

describe('NotFoundPage', () => {
  let component

  beforeEach(() => {
    component = shallow(<NotFoundPage/>, {disableLifecycleMethods: true})
  })

  it('renders the error page with appropriate text', () => {
    const errorPageProps = component.find('ErrorPage').props()
    expect(errorPageProps.message).toEqual('Sorry, this is not the page you want.')
    expect(errorPageProps.details).toEqual(
      "It may have been deleted or doesn't exist. Please check the address or"
    )
  })
})
