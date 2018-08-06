import React from 'react'
import {shallow} from 'enzyme'
import PrivacyPolicy from 'views/pages/PrivacyPolicy'

describe('PrivacyPolicy', () => {
  it('renders within a container to limit width', () => {
    const root = shallow(<PrivacyPolicy/>)
    expect(root.props().className).toEqual('container')
  })
})
