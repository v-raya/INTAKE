import React from 'react'
import RelationCard from 'common/relationship/RelationCard'
import {mount} from 'enzyme'
import AttachLink from 'common/relationship/AttachLink'

describe('RelationCard', () => {
  const props = {
    person: {
      name: 'Sally Jones',
      relationships: [{
        type: 'mother',
        name: 'Kim Johnson',
        secondaryRelationship: 'mother',
        person_card_exists: false,
      }, {
        type: 'father',
        name: 'Bugs Bunny',
        secondaryRelationship: 'father',
        person_card_exists: false,
      }],
    },
    isScreening: true,
    screeningId: '1',
    onClick: () => {},
    onSave: () => {},
    editFormRelationship: {
      absent_parent_indicator: false,
      client_id: 'ZXY123',
      end_date: '2010-10-01',
      id: '12345',
      relationship_type: 181,
      relative_id: 'ABC987',
      same_home_status: 'Y',
      start_date: '1999-10-01',
    },
    onChange: () => {},
    onEdit: () => {},
    pendingPeople: [],
  }
  const renderRelationCard = (props) => mount(<RelationCard {...props}/>, {disableLifecycleMethods: true})

  it('has a BootstrapTable', () => {
    expect(renderRelationCard(props).find('BootstrapTable').length).toBe(1)
  })

  it('has a TableHeaderColumn', () => {
    expect(renderRelationCard(props).find('TableHeaderColumn').length).toBe(4)
  })

  it('has 1 Attach link', () => {
    expect(renderRelationCard(props).find(AttachLink).length).toBe(2)
  })

  it('Attach link has the right props', () => {
    expect(renderRelationCard(props).find(AttachLink).at(0).prop('relationship')).toEqual({
      type: 'mother',
      name: 'Kim Johnson',
      secondaryRelationship: 'mother',
      person_card_exists: false,
    })

    expect(renderRelationCard(props).find(AttachLink).at(1).prop('relationship')).toEqual({
      type: 'father',
      name: 'Bugs Bunny',
      secondaryRelationship: 'father',
      person_card_exists: false,
    })
  })

  it('renders the firstName and lastName', () => {
    expect(renderRelationCard(props).find('.child-name').text()).toEqual('Sally Jones')
  })

  describe('BootstrapTable', () => {
    const render = renderRelationCard(props)

    it('has props data passed by RelationCard', () => {
      expect(render.find('BootstrapTable').prop('data')).toBe(props.person.relationships)
    })
  })
})
