import React from 'react'
import {shallow} from 'enzyme'
import SnapshotIntro from 'snapshots/SnapshotIntro'

describe('SnapshotIntro', () => {
  let component
  beforeEach(() => {
    component = shallow(<SnapshotIntro />)
  })

  it('renders an invisible header for accessibility outline', () => {
    const header = component.find('h2')
    expect(header.exists()).toEqual(true)
    expect(header.props().className).toEqual('hidden')
  })
})
