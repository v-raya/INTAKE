import React from 'react'
import {shallow} from 'enzyme'
import PrivacyPolicy from 'views/pages/PrivacyPolicy'

describe('PrivacyPolicy', () => {
  let root

  beforeEach(() => {
    root = shallow(<PrivacyPolicy/>)
  })

  it('renders within a container to limit width', () => {
    expect(root.props().className).toEqual('container')
  })

  it('renders a breadCrumb', () => {
    expect(root.find('BreadCrumb').exists()).toEqual(true)
  })
})
