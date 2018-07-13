import React from 'react'
import AttachLink from 'common/relationship/AttachLink'
import {shallow, mount} from 'enzyme'
import {EmptyRelationships, Relationships} from 'common/Relationships'

describe('Relationships for Screening', () => {
  const getProps = (component, cardNumber) => (
    component.find('RelationCard').at(cardNumber).props()
  )
  const getCellValue = (component, cardNumber, rowNumber, colNumber) => (
    component.find('RelationCard').at(cardNumber).find('BootstrapTable').find('TableBody').find('TableRow').at(rowNumber).find('TableColumn').at(colNumber)
  )

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

  it('renders a RelationCard component for each person with relationships', () => {
    expect(component.find('RelationCard').length).toEqual(4)
  })

  it('passes correct props name to RelationCard component', () => {
    expect(getProps(component, 0).name).toEqual('Sally Jones')
    expect(getProps(component, 1).name).toEqual('Nate Starbringer')
    expect(getProps(component, 2).name).toEqual('Jim Johnson')
    expect(getProps(component, 3).name).toEqual('Cecilia Gomez')
  })

  it('passes correct props (data) to RelationCard component', () => {
    expect(getProps(component, 0).data[0].name).toEqual('Kim Johnson')
    expect(getProps(component, 0).data[0].secondaryRelationship).toEqual('mother')
    expect(getProps(component, 1).data[0].name).toEqual('Jim Johnson')
    expect(getProps(component, 1).data[0].secondaryRelationship).toEqual('father')
    expect(getProps(component, 2).data[0].name).toEqual('Nate Starbringer')
    expect(getProps(component, 2).data[0].secondaryRelationship).toEqual('son')
    expect(getProps(component, 2).data[1].name).toEqual('Sally Jones')
    expect(getProps(component, 2).data[1].secondaryRelationship).toEqual('son')
    expect(getProps(component, 3).data[0].name).toEqual('Jose Gomez')
    expect(getProps(component, 3).data[0].secondaryRelationship).toEqual('son')
    expect(getProps(component, 3).data[1].name).toEqual('Julie Gomez')
    expect(getProps(component, 3).data[1].secondaryRelationship).toEqual('daughter')
  })

  it('shows Attach link for each unattached person', () => {
    expect(getProps(component, 0).name).toEqual('Sally Jones')
    expect(getProps(component, 0).data[0].name).toEqual('Kim Johnson')
    expect(getCellValue(component, 0, 0, 3).text()).toContain('Attach')

    expect(getProps(component, 1).name).toEqual('Nate Starbringer')
    expect(getCellValue(component, 1, 0, 0).text()).toEqual('Jim Johnson')
    expect(getCellValue(component, 1, 0, 3).text()).not.toContain('Attach')
  })

  it('hides Attach link for people in the pending list', () => {
    expect(getProps(component, 3).name).toEqual('Cecilia Gomez')
    expect(getCellValue(component, 3, 0, 0).text()).toEqual('Jose Gomez')
    expect(getCellValue(component, 3, 0, 3).text()).not.toContain('Attach')
    expect(getCellValue(component, 3, 1, 0).text()).toEqual('Julie Gomez')
    expect(getCellValue(component, 3, 1, 3).text()).toContain('Attach')
  })

  it('calls onClick when the Attach Link is clicked', () => {
    const attachLink = getCellValue(component, 0, 0, 3).find('a').first()
    attachLink.simulate('click')
    expect(onClick).toHaveBeenCalled()
  })

  it('renders people with no relationships', () => {
    expect(component.find('.no-relationships').at(0).text()).toContain('Nally Raymonds has no known relationships')
    expect(component.find('.no-relationships').at(1).text()).toContain('Kate Winslet has no known relationships')
    expect(component.find('.no-relationships').at(2).text()).toContain('Kim West has no known relationships')
  })
})

describe('Relationships for Snapshot', () => {
  const onClick = jasmine.createSpy('onClick')
  const renderRelationships = (props) =>
    shallow(<Relationships {...props} isScreening={false} onClick={onClick} />, {disableLifecycleMethods: true})

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
    const component = renderRelationships({people}).find(AttachLink)

    expect(component.length).toBe(4)
    expect(component.at(0).prop('relationship')).toEqual({name: 'Jim Johnson', type: 'mother', person_card_exists: true})
    expect(component.at(1).prop('relationship')).toEqual({name: 'Jim Johnson', type: 'father', person_card_exists: false})
    expect(component.at(2).prop('relationship')).toEqual({name: 'Nate Starbringer', type: 'son', person_card_exists: true})
    expect(component.at(3).prop('relationship')).toEqual({name: 'Sally Jones', type: 'son', person_card_exists: true})
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
    const component = renderRelationships({people, pendingPeople}).find(AttachLink)

    expect(component.length).toBe(2)
    expect(component.at(0).prop('relationship')).toEqual({name: 'Jim Johnson', type: 'mother', person_card_exists: true, legacy_descriptor: {legacy_id: '1'}})
    expect(component.at(1).prop('relationship')).toEqual({name: 'Jim Johnson', type: 'father', person_card_exists: true})
  })
})

describe('EmptyRelationships', () => {
  it('renders a reminder to add people when there are no relationships', () => {
    const component = shallow(<EmptyRelationships />, {disableLifecycleMethods: true})
    expect(component.find('.empty-relationships').text()).toEqual('Search for people and add them to see their relationships.')
  })
})
