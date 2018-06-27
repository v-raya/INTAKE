import React from 'react'
import RelationCard from 'common/relationship/RelationCard'
import {shallow} from 'enzyme'

describe('RelationCard', () => {
  const props = {
    name: 'Han Solo',
    data: [{
      name: 'Luke Skywalker',
      secondaryRelationship: 'No Relation',
    }],
    attachActions: () => {},
    expandableRow: () => {},
    expandComponent: () => {},
    expandColumnComponent: {},
  }
  const renderRelationCard = (props) => shallow(<RelationCard {...props}/>, {disableLifecycleMethods: true})

  it('has a BootstrapTable', () => {
    expect(renderRelationCard(props).find('BootstrapTable').length).toBe(1)
  })

  it('has a TableHeaderColumn', () => {
    expect(renderRelationCard(props).find('TableHeaderColumn').length).toBe(3)
  })

  it('renders the firstName and lastName', () => {
    expect(renderRelationCard(props).find('div.child-name').text()).toEqual('Han Solo')
  })

  describe('BootstrapTable', () => {
    const render = renderRelationCard(props)

    it('has props data passed by RelationCard', () => {
      expect(render.find('BootstrapTable').prop('data')).toBe(props.data)
    })
  })
})