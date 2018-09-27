import ReferralView from 'views/history/ReferralView'
import React from 'react'
import {shallow} from 'enzyme'

describe('ReferralView', () => {
  const INDEX_COL = 0
  const DATE_COL = 1
  const STATUS_COL = 2
  const COUNTY_COL = 3
  const PEOPLE_COL = 4

  const renderReferralView = ({peopleAndRoles = [], ...args}) => {
    const props = {peopleAndRoles, ...args}
    return shallow(<ReferralView {...props}/>, {disableLifecycleMethods: true})
  }

  it('renders an index in the referral list', () => {
    const index = 7
    const component = renderReferralView({index})
    expect(component.find('td').at(INDEX_COL).text()).toEqual('7.')
  })

  it('renders a date range for the history entry', () => {
    const dateRange = '01/02/2002 - 01/03/2002'
    const component = renderReferralView({dateRange})
    expect(component.find('td').at(DATE_COL).text()).toEqual('01/02/2002 - 01/03/2002')
  })

  it('renders a history entry of type Referral with its id, status, and access notification', () => {
    const referralId = '1'
    const status = 'open'
    const component = renderReferralView({referralId, status})
    expect(component.find('td').at(STATUS_COL).find('.referral').text()).toEqual('Referral')
    expect(component.find('td').at(STATUS_COL).find('.referral-id').text()).toEqual('1')
    expect(component.find('td').at(STATUS_COL).find('.referral-status').text()).toEqual(`(${status})`)
  })

  it('renders an access notification only if its present', () => {
    const notification = 'notification'
    const componentWithNotification = renderReferralView({notification})
    expect(componentWithNotification.find('td').at(STATUS_COL).find('.information-flag').text()).toEqual(notification)
    const componentWithoutNotification = renderReferralView({})
    expect(componentWithoutNotification.find('td').at(STATUS_COL).text()).not.toContain(notification)
  })

  it('renders a history entry with its incident county', () => {
    const county = 'Yolo'
    const component = renderReferralView({county})
    expect(component.find('td').at(COUNTY_COL).text()).toEqual(county)
  })

  it('renders a table for people and roles', () => {
    const component = renderReferralView({})
    expect(component.find('td').at(PEOPLE_COL).find('table').exists()).toEqual(true)
  })

  describe('for people and roles', () => {
    it('renders a header for victims, perpetrators, and allegations/disposition', () => {
      const component = renderReferralView({})
      expect(component.find('.people-and-roles').find('th.victim').text()).toEqual('Victim')
      expect(component.find('.people-and-roles').find('th.perpetrator').text()).toEqual('Perpetrator')
      expect(component.find('.people-and-roles').find('th.allegations.disposition').text()).toEqual('Allegation(s) & Conclusion(s)')
    })

    it('renders a victim for each person', () => {
      const peopleAndRoles = [
        {victim: 'Jane Doe'},
        {victim: 'Homer Simpson'},
      ]
      const component = renderReferralView({peopleAndRoles})
      expect(component.find('.people-and-roles').render().find('tbody tr td.victim').first().text()).toEqual('Jane Doe')
      expect(component.find('.people-and-roles').render().find('tbody tr td.victim').last().text()).toEqual('Homer Simpson')
    })

    it('renders a perpetrator for each person', () => {
      const peopleAndRoles = [
        {perpetrator: 'Jane Doe'},
        {perpetrator: 'Homer Simpson'},
      ]
      const component = renderReferralView({peopleAndRoles})
      expect(component.find('.people-and-roles').render().find('tbody tr td.perpetrator').first().text()).toEqual('Jane Doe')
      expect(component.find('.people-and-roles').render().find('tbody tr td.perpetrator').last().text()).toEqual('Homer Simpson')
    })

    it('renders a allegations and disposition for each person', () => {
      const peopleAndRoles = [
        {allegations: 'allegations one', disposition: '(pending)'},
        {allegations: 'allegations two', disposition: '(not pending)'},
      ]
      const component = renderReferralView({peopleAndRoles})
      expect(component.find('.people-and-roles').render().find('tbody tr td.allegations.disposition').first().text()).toEqual('allegations one (pending)')
      expect(component.find('.people-and-roles').render().find('tbody tr td.allegations.disposition').last().text()).toEqual('allegations two (not pending)')
    })

    it('renders the reporter and worker', () => {
      const worker = 'Bob'
      const reporter = 'Sally'
      const component = renderReferralView({worker, reporter})
      expect(component.find('.people-and-roles').text()).toContain(`Reporter: ${reporter}`)
      expect(component.find('.people-and-roles').text()).toContain(`Worker: ${worker}`)
    })
  })
})
