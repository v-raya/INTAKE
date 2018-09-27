import PeopleAndRolesTableBody from 'views/history/PeopleAndRolesTableBody'
import React from 'react'
import {mount} from 'enzyme'

describe('PeopleAndRolesTableBody', () => {
  const render = (peopleAndRoles = []) => {
    const wrapper = mount(
      <table><tbody>
        <PeopleAndRolesTableBody peopleAndRoles={peopleAndRoles} />
      </tbody></table>
    )
    return wrapper.find(PeopleAndRolesTableBody)
  }

  it('renders a victim for each person', () => {
    const peopleAndRoles = [
      {victim: 'Jane Doe'},
      {victim: 'Homer Simpson'},
    ]
    const component = render(peopleAndRoles)
    expect(component.find('tr td.victim').at(0).text()).toEqual('Jane Doe')
    expect(component.find('tr td.victim').at(1).text()).toEqual('Homer Simpson')
  })

  it('renders a perpetrator for each person', () => {
    const peopleAndRoles = [
      {perpetrator: 'Jane Doe'},
      {perpetrator: 'Homer Simpson'},
    ]
    const component = render(peopleAndRoles)
    expect(component.find('tr').at(0).find('td.perpetrator').text()).toEqual('Jane Doe')
    expect(component.find('tr').at(1).find('td.perpetrator').text()).toEqual('Homer Simpson')
  })

  it('renders a allegations and disposition for each person', () => {
    const peopleAndRoles = [
      {allegations: 'allegations one', disposition: '(pending)'},
      {allegations: 'allegations two', disposition: '(not pending)'},
    ]
    const component = render(peopleAndRoles)
    expect(component.find('tr').at(0).find('td.allegations.disposition').text()).toEqual('allegations one (pending)')
    expect(component.find('tr').at(1).find('td.allegations.disposition').text()).toEqual('allegations two (not pending)')
  })
})
