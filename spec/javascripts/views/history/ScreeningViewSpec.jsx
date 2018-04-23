import ScreeningView from 'views/history/ScreeningView'
import React from 'react'
import {shallow} from 'enzyme'

describe('ScreeningView', () => {
  const INDEX_COL = 0
  const DATE_COL = 1
  const STATUS_COL = 2
  const COUNTY_COL = 3
  const PEOPLE_COL = 4

  const renderScreeningView = ({...props}) => (
    shallow(<ScreeningView {...props} />, {disableLifecycleMethods: true})
  )

  it('renders an index in the case list', () => {
    const index = 7
    const component = renderScreeningView({index})
    expect(component.find('td').at(INDEX_COL).text()).toEqual('7.')
  })

  it('renders a date range for the screening', () => {
    const dateRange = '01/02/2002 - 02/03/2002'
    const component = renderScreeningView({dateRange})
    expect(component.find('td').at(DATE_COL).text()).toEqual('01/02/2002 - 02/03/2002')
  })

  it('renders a type/status for the screening', () => {
    const status = 'In Progress'
    const component = renderScreeningView({status})
    const divs = component.find('td').at(STATUS_COL).find('div')
    expect(divs.at(0).text()).toEqual('Screening')
    expect(divs.at(1).text()).toEqual(`(${status})`)
  })

  it('renders the appropriate county for the screening', () => {
    const county = 'Amador'
    const component = renderScreeningView({county})
    expect(component.find('td').at(COUNTY_COL).text()).toEqual(county)
  })

  it('renders all people', () => {
    const people = 'John Smith, Jane Doe, Bob Jones'
    const component = renderScreeningView({people})
    expect(component.find('td').at(PEOPLE_COL).find('.people').text())
      .toEqual('John Smith, Jane Doe, Bob Jones')
  })

  it('renders the reporter', () => {
    const reporter = 'Homer Simpson'
    const component = renderScreeningView({reporter})
    expect(component.find('td').at(PEOPLE_COL).find('.reporter').text()).toEqual('Reporter: Homer Simpson')
  })

  it('renders the social worker', () => {
    const worker = 'Sandy Simpson'
    const component = renderScreeningView({worker})
    expect(component.find('td').at(PEOPLE_COL).find('.worker').text()).toEqual('Worker: Sandy Simpson')
  })
})
