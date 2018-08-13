import {BreadCrumb} from 'common/BreadCrumb'
import React from 'react'
import {shallow} from 'enzyme'

describe('BreadCrumb', () => {
  it("renders back to 'Dashboard' link", () => {
    const breadCrumb = shallow(
      <BreadCrumb />, {disableLifecycleMethods: true}
    )
    expect(breadCrumb.text()).toContain('Back to:')
    expect(breadCrumb.find('a').props().href).toEqual('/dashboard')
  })

  it('renders with a single node', () => {
    const props = [<a key='' href='/'>CaseLoad</a>]
    const breadCrumb = shallow(
      <BreadCrumb navigationElements={props} />, {disableLifecycleMethods: true}
    )
    expect(breadCrumb.text()).toContain('Back to:')
    expect(breadCrumb.find('a').length).toEqual(2)
  })
})
