import React from 'react'
import {mount} from 'enzyme'
import {Relationships} from 'common/Relationships'

describe('Relationships', () => {
  const onClick = jasmine.createSpy('onClick')
  const renderRelationships = (props) => mount(<Relationships {...props} isScreening={true} screeningId={'1'} pendingPeople = {['1']} onClick={onClick} />, {disableLifecycleMethods: true})
  const people = [
    {
      name: 'Sally Jones',
      relationships: [
        {relatee: 'Kim Johnson', type: 'mother', name: 'Kim Johnson', secondaryRelationship: 'mother', person_card_exists: true},
      ],
    },
    {
      name: 'Nate Starbringer',
      relationships: [
        {relatee: 'Jim Johnson', type: 'father', name: 'Jim Johnson', secondaryRelationship: 'father', person_card_exists: false},
      ],
    },
    {
      name: 'Jim Johnson',
      relationships: [
        {relatee: 'Nate Starbringer', type: 'son', name: 'Nate Starbringer', secondaryRelationship: 'son', person_card_exists: true},
        {relatee: 'Sally Jones', type: 'son', name: 'Sally Jones', secondaryRelationship: 'son', person_card_exists: true},
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

  const component = renderRelationships({people})

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
    expect(component.find('.relationships').at(0).text()).toContain('Nally Raymonds has no known relationships')
    expect(component.find('.relationships').at(1).text()).toContain('Kate Winslet has no known relationships')
    expect(component.find('.relationships').at(2).text()).toContain('Kim West has no known relationships')
  })
})
