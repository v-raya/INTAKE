import React from 'react'
import ErrorPage from 'errors/ErrorPage'
import {shallow} from 'enzyme'

describe('ErrorPage', () => {
  let component

  const render = (message, details) =>
    shallow(<ErrorPage message={message} details={details} />)

  it('renders the error text', () => {
    component = render(
      'This page is restricted.',
      "You don't have the appropriate permissions to view this page.")

    expect(component.text()).toContain('This page is restricted.')
    expect(component.text()).toContain(
      "You don't have the appropriate permissions to view this page."
    )
  })

  it('renders a link to dashboard', () => {
    expect(component.find('Link').props().to).toBe('/')
    expect(component.find('Link').props().children)
      .toBe('Return to your dashboard')
  })
})
