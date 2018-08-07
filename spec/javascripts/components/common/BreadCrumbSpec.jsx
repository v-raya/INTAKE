import {BreadCrumb} from 'common/BreadCrumb'
import React from 'react'
import {shallow} from 'enzyme'

describe('BreadCrumb', () => {
  const breadCrumb = shallow(
    <BreadCrumb />, {disableLifecycleMethods: true}
  )

  it("renders back to 'Dashboard' link", () => {
    expect(breadCrumb.text()).toContain('Back to:')
    expect(breadCrumb.find('a').props().href).toEqual('/')
  })
})
