import React from 'react'
import {shallow} from 'enzyme'
import ConditionsOfUse from 'views/pages/ConditionsOfUse'

describe('ConditionsOfUse', () => {
  let root

  beforeEach(() => {
    root = shallow(<ConditionsOfUse/>)
  })

  it('renders within a container to limit width', () => {
    expect(root.props().className).toEqual('container')
  })

  it('renders a breadCrumb', () => {
    expect(root.find('BreadCrumb').exists()).toEqual(true)
  })
})
