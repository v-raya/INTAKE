import React from 'react'
import {shallow} from 'enzyme'
import ConditionsOfUse from 'views/pages/ConditionsOfUse'

describe('ConditionsOfUse', () => {
  it('renders within a container to limit width', () => {
    const root = shallow(<ConditionsOfUse/>)
    expect(root.props().className).toEqual('container')
  })
})
