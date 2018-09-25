import {HomePage} from 'views/homePage'
import React from 'react'
import {shallow} from 'enzyme'

describe('HomePage', () => {
  describe('when it is only snapshot enabled', () => {
    it('displays the snapshot button', () => {
      const props = {snapshot: true, actions: {}}
      const homePage = shallow(<HomePage {...props}/>)
      const pageHeader = homePage.find('Connect(PageHeader)')
      const buttons = shallow(pageHeader.props().button)
      expect(buttons.text()).toContain('Start Snapshot')
    })
    it('does not display the hotline button', () => {
      const props = {snapshot: true, actions: {}}
      const homePage = shallow(<HomePage {...props}/>)
      const pageHeader = homePage.find('Connect(PageHeader)')
      const buttons = shallow(pageHeader.props().button)
      expect(buttons.text()).not.toContain('Start Screening')
    })
    it('does not load the screenings or display the list', () => {
      const props = {snapshot: true, actions: {}}
      const homePage = shallow(<HomePage {...props}/>)
      expect(homePage.find('Connect(ScreeningsTable)').length).toBe(0)
    })
  })
  describe('when it is only hotline enabled', () => {
    it('does not display the snapshot button', () => {
      const props = {hotline: true, actions: {}}
      const homePage = shallow(<HomePage {...props}/>)
      const pageHeader = homePage.find('Connect(PageHeader)')
      const buttons = shallow(pageHeader.props().button)
      expect(buttons.text()).not.toContain('Start Snapshot')
    })
    it('displays the hotline button', () => {
      const props = {hotline: true, actions: {}}
      const homePage = shallow(<HomePage {...props}/>)
      const pageHeader = homePage.find('Connect(PageHeader)')
      const buttons = shallow(pageHeader.props().button)
      expect(buttons.text()).toContain('Start Screening')
    })
    it('loads the screenings and displays the list', () => {
      const props = {hotline: true, actions: {}}
      const homePage = shallow(<HomePage {...props}/>)
      expect(homePage.find('Connect(ScreeningsTable)').length).toBe(1)
    })
  })
  describe('when it is hotline and snapshot enabled', () => {
    it('displays the snapshot button', () => {
      const props = {snapshot: true, hotline: true, actions: {}}
      const homePage = shallow(<HomePage {...props}/>)
      const pageHeader = homePage.find('Connect(PageHeader)')
      const buttons = shallow(pageHeader.props().button)
      expect(buttons.text()).toContain('Start Snapshot')
    })
    it('displays the hotline button', () => {
      const props = {snapshot: true, hotline: true, actions: {}}
      const homePage = shallow(<HomePage {...props}/>)
      const pageHeader = homePage.find('Connect(PageHeader)')
      const buttons = shallow(pageHeader.props().button)
      expect(buttons.text()).toContain('Start Screening')
    })
    it('loads the screenings and displays the list', () => {
      const props = {hotline: true, actions: {}}
      const homePage = shallow(<HomePage {...props}/>)
      expect(homePage.find('Connect(ScreeningsTable)').length).toBe(1)
    })
  })
  it('renders a BreadCrumb', () => {
    const props = {snapshot: true, hotline: true, actions: {}}
    const homePage = shallow(<HomePage {...props}/>)
    expect(homePage.find('Connect(BreadCrumb)').exists()).toBe(true)
  })
})
