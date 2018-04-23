import React from 'react'
import {shallow} from 'enzyme'
import CaseView from 'views/history/CaseView'

describe('History Case View', () => {
  const INDEX_COL = 0
  const DATE_COL = 1
  const STATUS_COL = 2
  const COUNTY_COL = 3
  const PEOPLE_COL = 4

  const renderCaseView = ({...props}) => (
    shallow(<CaseView {...props} />, {disableLifecycleMethods: true})
  )

  it('renders an index in the case list', () => {
    const index = 7
    const component = renderCaseView({index})
    expect(component.find('td').at(INDEX_COL).text()).toEqual('7.')
  })

  it('renders a date range', () => {
    const dateRange = '01/02/03 - 04/05/06'
    const component = renderCaseView({dateRange})
    expect(component.find('td').at(DATE_COL).text()).toEqual(dateRange)
  })

  it('renders the case id and status', () => {
    const status = 'Open'
    const caseId = 'ABC123'
    const component = renderCaseView({status, caseId})
    const idStatusCell = component.find('td').at(STATUS_COL)
    expect(idStatusCell.text()).toContain('Case')
    expect(idStatusCell.text()).toContain(`(${status})`)
    expect(idStatusCell.text()).toContain(caseId)
  })

  it('renders the access notification', () => {
    const restrictedAccessStatus = 'Sealed'
    const component = renderCaseView({restrictedAccessStatus})
    expect(component.find('td').at(STATUS_COL).text()).toContain(restrictedAccessStatus)
    expect(component.find('.information-flag').exists()).toEqual(true)
  })

  it('does not render access notification if none exists', () => {
    const restrictedAccessStatus = ''
    const component = renderCaseView({restrictedAccessStatus})
    expect(component.find('.information-flag').exists()).toEqual(false)
  })

  it('renders the county', () => {
    const county = 'Plumas'
    const component = renderCaseView({county})
    expect(component.find('td').at(COUNTY_COL).text()).toEqual(county)
  })

  it('renders the focus child', () => {
    const focusChild = 'John Smith'
    const component = renderCaseView({focusChild})
    expect(component.find('td').at(PEOPLE_COL).text()).toContain(`Focus Child: ${focusChild}`)
  })

  it('renders the parents', () => {
    const parents = 'John Smith, Jane Doe'
    const component = renderCaseView({parents})
    expect(component.find('td').at(PEOPLE_COL).text()).toContain(`Parent(s): ${parents}`)
  })

  it('renders the name of the social worker', () => {
    const worker = 'Jane Doe'
    const component = renderCaseView({worker})
    expect(component.find('td').at(PEOPLE_COL).text()).toContain(`Worker: ${worker}`)
  })
})
