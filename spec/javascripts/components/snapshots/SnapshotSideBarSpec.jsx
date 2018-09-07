import React from 'react'
import {shallow} from 'enzyme'
import SnapshotSideBar from 'snapshots/SnapshotSideBar'

describe('SnapshotSideBar', () => {
  let component
  const participants = [{id: '23', first_name: 'Ultra', last_name: 'Goku', middle_name: '', name_suffix: ''}]
  beforeEach(() => {
    component = shallow(<SnapshotSideBar participants={participants} />)
  })

  it('renders the div wrapper', () => {
    expect(component.find('div.col-md-3 div.col-xs-4').exists()).toBe(true)
  })

  it('renders side-bar-error class when there is an error', () => {
    const navbar = shallow(<SnapshotSideBar participants={participants} error={true}/>, {disableLifecycleMethods: true})
    expect(navbar.find('.side-bar-error').exists()).toEqual(true)
  })

  it('renders side-bar-no-error class when there is not an error', () => {
    const navbar = shallow(<SnapshotSideBar participants={participants} error={false}/>, {disableLifecycleMethods: true})
    expect(navbar.find('.side-bar-no-error').exists()).toEqual(true)
  })

  it('renders an invisible header for accessibility outline', () => {
    const header = component.find('h2')
    expect(header.exists()).toEqual(true)
    expect(header.props().className).toEqual('hidden')
  })

  it('renders the SideBar component', () => {
    expect(component.find('SideBar').exists()).toBe(true)
  })

  it('renders People & Roles', () => {
    const sidebarPeople = component.find('SideBarPeople')
    expect(sidebarPeople.exists()).toEqual(true)
    expect(sidebarPeople.props().participants).toEqual(participants)
  })

  it('renders a link to the History card', () => {
    expect(component.find('NavLink[text="History"]').props().href)
      .toBe('#history-card-anchor')
  })
})
