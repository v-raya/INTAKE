import React from 'react'
import {shallow} from 'enzyme'
import {EmptyRelationships, Relationships} from 'common/Relationships'

describe('Relationships', () => {
  const onClick = jasmine.createSpy('onClick')
  const renderRelationships = (props) => shallow(<Relationships {...props} onClick={onClick} />, {disableLifecycleMethods: true})
  it('renders people with no relationships', () => {
    const people = [
      {name: 'Sally Jones', relationships: []},
      {name: 'Nate Starbringer', relationships: []},
      {name: 'Jim Johnson', relationships: []},
    ]
    const component = renderRelationships({people})
    expect(component.find('.person').at(0).text()).toEqual('Sally Jones')
    expect(component.find('.person').at(1).text()).toEqual('Nate Starbringer')
    expect(component.find('.person').at(2).text()).toEqual('Jim Johnson')
  })

  it('renders relationships for each person', () => {
    const people = [
      {
        name: 'Sally Jones',
        relationships: [
          {relatee: 'Jim Johnson', type: 'mother', person_card_exists: true},
        ],
      },
      {
        name: 'Nate Starbringer',
        relationships: [
          {relatee: 'Jim Johnson', type: 'father', person_card_exists: false},
        ],
      },
      {
        name: 'Jim Johnson',
        relationships: [
          {relatee: 'Nate Starbringer', type: 'son', person_card_exists: true},
          {relatee: 'Sally Jones', type: 'son', person_card_exists: true},
        ],
      },
    ]
    const component = renderRelationships({people})
    expect(component.find('.relationships').at(0).find('li').at(0).text()).toEqual('mother of Jim Johnson Attach')
    expect(component.find('.relationships').at(1).find('li').at(0).text()).toEqual('father of Jim Johnson')
    expect(component.find('.relationships').at(2).find('li').at(1).text()).toEqual('son of Sally Jones Attach')
    expect(component.find('.relationships').at(2).find('li').at(0).text()).toEqual('son of Nate Starbringer Attach')
  })

  it('hides Attach link for people in the pending list', () => {
    const people = [
      {
        name: 'Sally Jones',
        relationships: [
          {relatee: 'Jim Johnson', type: 'mother', person_card_exists: true, legacy_descriptor: {legacy_id: '1'}},
        ],
      },
      {
        name: 'Nate Starbringer',
        relationships: [
          {relatee: 'Jim Johnson', type: 'father', person_card_exists: true},
        ],
      },
    ]

    const pendingPeople = ['1']

    const component = renderRelationships({people, pendingPeople})
    expect(component.find('.relationships').at(0).find('li').at(0).text()).toEqual('mother of Jim Johnson')
    expect(component.find('.relationships').at(1).find('li').at(0).text()).toEqual('father of Jim Johnson Attach')
  })

  it('calls onClick when the Attach Link is clicked', () => {
    const people = [
      {
        name: 'Goku',
        relationships: [
          {relatee: 'Gohan', type: 'son', person_card_exists: true},
        ],
      },
    ]
    const component = renderRelationships({people})
    const attachLink = component.find('a').at(0)
    attachLink.simulate('click')
    expect(onClick).toHaveBeenCalled()
  })

  it('renders a relationships table when there are relationships based on screening/snapshot page', () => {
    const people = [
      {
        name: 'Sally Jones',
        relationships: [
          {relatee: 'Jim Johnson', type: 'mother', person_card_exists: true},
        ],
      },
    ]
    const component = renderRelationships({people, isScreening: true})
    expect(component.html()).toContain('react-bs-table-container')
  })
})

describe('EmptyRelationships', () => {
  it('renders a reminder to add people when there are no relationships', () => {
    const component = shallow(<EmptyRelationships />, {disableLifecycleMethods: true})
    expect(component.find('.empty-relationships').text()).toEqual('Search for people and add them to see their relationships.')
  })
})
