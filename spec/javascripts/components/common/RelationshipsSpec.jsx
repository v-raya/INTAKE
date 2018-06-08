import React from 'react'
import {shallow, mount} from 'enzyme'
import {EmptyRelationships, Relationships} from 'common/Relationships'

describe('Relationships for Screening', () => {
  let onClick
  let component
  const renderRelationships = (props) => mount(<Relationships {...props} isScreening={true} screeningId={'1'} pendingPeople = {['1']} onClick={onClick} />, {disableLifecycleMethods: true})
  const people = [
    {
      name: 'Sally Jones',
      relationships: [
        {type: 'mother', name: 'Kim Johnson', secondaryRelationship: 'mother', person_card_exists: true},
      ],
    },
    {
      name: 'Nate Starbringer',
      relationships: [
        {type: 'father', name: 'Jim Johnson', secondaryRelationship: 'father', person_card_exists: false},
      ],
    },
    {
      name: 'Jim Johnson',
      relationships: [
        {type: 'son', name: 'Nate Starbringer', secondaryRelationship: 'son', person_card_exists: true},
        {type: 'son', name: 'Sally Jones', secondaryRelationship: 'son', person_card_exists: true},
      ],
    },
    {
      name: 'Cecilia Gomez',
      relationships: [
        {name: 'Jose Gomez', secondaryRelationship: 'son', person_card_exists: true, legacy_descriptor: {legacy_id: '1'}},
        {name: 'Julie Gomez', secondaryRelationship: 'daughter', person_card_exists: true},
      ],
    },
    {name: 'Nally Raymonds', relationships: []},
    {name: 'Kate Winslet', relationships: []},
    {name: 'Kim West', relationships: []},
  ]

  beforeEach(() => {
    onClick = jasmine.createSpy('onClick')
    component = renderRelationships({people})
  })

  it('1.renders a RelationCard component for each person with relationships', () => {
    expect(component.find('RelationCard').length).toEqual(4)
    expect(component.find('RelationCard').at(0).props().firstName).toEqual('Sally Jones')
    expect(component.find('RelationCard').at(1).props().firstName).toEqual('Nate Starbringer')
    expect(component.find('RelationCard').at(2).props().firstName).toEqual('Jim Johnson')
    expect(component.find('RelationCard').at(3).props().firstName).toEqual('Cecilia Gomez')
  })

  it('2.renders relationships table for each person with relationships', () => {
    expect(component.find('RelationCard').at(0).find('BootstrapTable').length).toEqual(1)
    expect(component.find('RelationCard').at(1).find('BootstrapTable').length).toEqual(1)
    expect(component.find('RelationCard').at(2).find('BootstrapTable').length).toEqual(1)
    expect(component.find('RelationCard').at(3).find('BootstrapTable').length).toEqual(1)
  })

  it('3.renders the correct headers for the relationships table', () => {
    expect(component.find('RelationCard').at(0).find('BootstrapTable').find('TableHeader').at(0).find('TableHeaderColumn').at(0).text()).toEqual('Name')
    expect(component.find('RelationCard').at(0).find('BootstrapTable').find('TableHeader').at(0).find('TableHeaderColumn').at(1).text()).toEqual('Relationship')
    expect(component.find('RelationCard').at(0).find('BootstrapTable').find('TableHeader').at(0).find('TableHeaderColumn').at(2).text()).toEqual('Age')
    expect(component.find('RelationCard').at(0).find('BootstrapTable').find('TableHeader').at(0).find('TableHeaderColumn').at(3).text()).toEqual('Actions')
    expect(component.find('RelationCard').at(0).find('BootstrapTable').find('TableHeader').at(0).find('TableHeaderColumn').at(4).text()).toEqual('Attach')
  })

  it('4.shows correct fields for each relationship in the relationships table', () => {
    expect(component.find('RelationCard').at(0).props().firstName).toEqual('Sally Jones')
    expect(component.find('RelationCard').at(0).find('BootstrapTable').find('TableBody').at(0).find('TableRow').at(0).find('TableColumn').at(0).text()).toEqual('Kim Johnson')
    expect(component.find('RelationCard').at(0).find('BootstrapTable').find('TableBody').at(0).find('TableRow').at(0).find('TableColumn').at(1).text()).toEqual('mother')
    expect(component.find('RelationCard').at(0).find('BootstrapTable').find('TableBody').at(0).find('TableRow').at(0).find('TableColumn').at(2).text()).toEqual('')
    expect(component.find('RelationCard').at(0).find('BootstrapTable').find('TableBody').at(0).find('TableRow').at(0).find('TableColumn').at(3).text()).toEqual('')
    expect(component.find('RelationCard').at(0).find('BootstrapTable').find('TableBody').at(0).find('TableRow').at(0).find('TableColumn').at(4).text()).toContain('Attach')

    expect(component.find('RelationCard').at(2).props().firstName).toEqual('Jim Johnson')
    expect(component.find('RelationCard').at(2).find('BootstrapTable').find('TableBody').at(0).find('TableRow').at(0).find('TableColumn').at(0).text()).toEqual('Nate Starbringer')
    expect(component.find('RelationCard').at(2).find('BootstrapTable').find('TableBody').at(0).find('TableRow').at(0).find('TableColumn').at(1).text()).toEqual('son')
    expect(component.find('RelationCard').at(2).find('BootstrapTable').find('TableBody').at(0).find('TableRow').at(0).find('TableColumn').at(2).text()).toEqual('')
    expect(component.find('RelationCard').at(2).find('BootstrapTable').find('TableBody').at(0).find('TableRow').at(0).find('TableColumn').at(3).text()).toEqual('')
    expect(component.find('RelationCard').at(2).find('BootstrapTable').find('TableBody').at(0).find('TableRow').at(0).find('TableColumn').at(4).text()).toContain('Attach')
  })

  it('5.shows Attach link for each unattached person', () => {
    expect(component.find('RelationCard').at(0).props().firstName).toEqual('Sally Jones')
    expect(component.find('RelationCard').at(0).find('BootstrapTable').find('TableBody').at(0).find('TableRow').at(0).find('TableColumn').at(0).text()).toEqual('Kim Johnson')
    expect(component.find('RelationCard').at(0).find('BootstrapTable').find('TableBody').at(0).find('TableRow').at(0).find('TableColumn').at(4).text()).toContain('Attach')

    expect(component.find('RelationCard').at(1).props().firstName).toEqual('Nate Starbringer')
    expect(component.find('RelationCard').at(1).find('BootstrapTable').find('TableBody').at(0).find('TableRow').at(0).find('TableColumn').at(0).text()).toEqual('Jim Johnson')
    expect(component.find('RelationCard').at(1).find('BootstrapTable').find('TableBody').at(0).find('TableRow').at(0).find('TableColumn').at(4).text()).toEqual('')

    expect(component.find('RelationCard').at(2).props().firstName).toEqual('Jim Johnson')
    expect(component.find('RelationCard').at(2).find('BootstrapTable').find('TableBody').at(0).find('TableRow').at(0).find('TableColumn').at(0).text()).toEqual('Nate Starbringer')
    expect(component.find('RelationCard').at(2).find('BootstrapTable').find('TableBody').at(0).find('TableRow').at(0).find('TableColumn').at(4).text()).toContain('Attach')
    expect(component.find('RelationCard').at(2).find('BootstrapTable').find('TableBody').at(0).find('TableRow').at(1).find('TableColumn').at(0).text()).toEqual('Sally Jones')
    expect(component.find('RelationCard').at(2).find('BootstrapTable').find('TableBody').at(0).find('TableRow').at(1).find('TableColumn').at(4).text()).toContain('Attach')
  })

  it('6.hides Attach link for people in the pending list', () => {
    expect(component.find('RelationCard').at(3).props().firstName).toEqual('Cecilia Gomez')
    expect(component.find('RelationCard').at(3).find('BootstrapTable').find('TableBody').at(0).find('TableRow').at(0).find('TableColumn').at(0).text()).toEqual('Jose Gomez')
    expect(component.find('RelationCard').at(3).find('BootstrapTable').find('TableBody').at(0).find('TableRow').at(0).find('TableColumn').at(4).text()).toEqual('')
    expect(component.find('RelationCard').at(3).find('BootstrapTable').find('TableBody').at(0).find('TableRow').at(1).find('TableColumn').at(0).text()).toEqual('Julie Gomez')
    expect(component.find('RelationCard').at(3).find('BootstrapTable').find('TableBody').at(0).find('TableRow').at(1).find('TableColumn').at(4).text()).toContain('Attach')
  })

  it('7.calls onClick when the Attach Link is clicked', () => {
    const attachLink = component.find('RelationCard').at(0).find('BootstrapTable').find('TableBody').at(0).find('TableRow').at(0).find('TableColumn').at(4).find('a')
    attachLink.simulate('click')
    expect(onClick).toHaveBeenCalled()
  })

  it('8.renders people with no relationships', () => {
    expect(component.find('.no-relationships').at(0).text()).toContain('Nally Raymonds has no known relationships')
    expect(component.find('.no-relationships').at(1).text()).toContain('Kate Winslet has no known relationships')
    expect(component.find('.no-relationships').at(2).text()).toContain('Kim West has no known relationships')
  })
})

describe('Relationships for Snapshot', () => {
  const onClick = jasmine.createSpy('onClick')
  const renderRelationships = (props) => shallow(<Relationships {...props} isScreening={false} onClick={onClick} />, {disableLifecycleMethods: true})
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
          {name: 'Jim Johnson', type: 'mother', person_card_exists: true},
        ],
      },
      {
        name: 'Nate Starbringer',
        relationships: [
          {name: 'Jim Johnson', type: 'father', person_card_exists: false},
        ],
      },
      {
        name: 'Jim Johnson',
        relationships: [
          {name: 'Nate Starbringer', type: 'son', person_card_exists: true},
          {name: 'Sally Jones', type: 'son', person_card_exists: true},
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
          {name: 'Jim Johnson', type: 'mother', person_card_exists: true, legacy_descriptor: {legacy_id: '1'}},
        ],
      },
      {
        name: 'Nate Starbringer',
        relationships: [
          {name: 'Jim Johnson', type: 'father', person_card_exists: true},
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
          {name: 'Gohan', type: 'son', person_card_exists: true},
        ],
      },
    ]
    const component = renderRelationships({people})
    const attachLink = component.find('a').at(0)
    attachLink.simulate('click')
    expect(onClick).toHaveBeenCalled()
  })
})

describe('EmptyRelationships', () => {
  it('renders a reminder to add people when there are no relationships', () => {
    const component = shallow(<EmptyRelationships />, {disableLifecycleMethods: true})
    expect(component.find('.empty-relationships').text()).toEqual('Search for people and add them to see their relationships.')
  })
})

