import React from 'react'
import {shallow} from 'enzyme'
import SideBarPeople from 'views/SideBarPeople'

describe('SideBarPeople', () => {
  let component
  describe('when empty', () => {
    const participants = []

    it('renders a link to the People Search card', () => {
      component = shallow(<SideBarPeople participants={participants}/>, {disableLifecycleMethods: true})

      expect(component.find('NavLink[text="People & Roles"]').props().href
      ).toBe('#search-card-anchor')
    })
  })

  describe('with participants', () => {
    const participants = [
      {id: '1', first_name: 'Scooby', last_name: 'Doo', name_suffix: ''},
      {id: '2', first_name: 'Shaggy', last_name: 'Rogers', name_suffix: 'esq'},
    ]

    beforeEach(() => {
      component = shallow(<SideBarPeople participants={participants}/>, {disableLifecycleMethods: true})
    })

    it('renders a link to the People Search card', () => {
      expect(component.find('NavLink[text="People & Roles"]').props().href
      ).toBe('#search-card-anchor')
    })

    it('renders a link to the People selected/created based on search', () => {
      expect(component.find('NavLink[text="Scooby Doo"]').exists()).toBe(true)
      expect(component.find('NavLink[text="Scooby Doo"]').props().href)
        .toBe('#participants-card-1')

      expect(component.find('NavLink[text="Shaggy Rogers, Esq"]').exists()).toBe(true)
      expect(component.find('NavLink[text="Shaggy Rogers, Esq"]').props().href)
        .toBe('#participants-card-2')
    })
  })
})
