import React from 'react'
import ForbiddenPage from 'errors/ForbiddenPage'
import {shallow} from 'enzyme'

describe('ForbiddenPage', () => {
  let component

  beforeEach(() => {
    component = shallow(<ForbiddenPage/>, {disableLifecycleMethods: true})
  })

  it('renders the error page with appropriate text', () => {
    const errorPageProps = component.find('ErrorPage').props()
    expect(errorPageProps.message).toEqual('This page is restricted.')
    expect(errorPageProps.details).toEqual(
      "You don't have the appropriate permissions to view this page."
    )
  })
})
