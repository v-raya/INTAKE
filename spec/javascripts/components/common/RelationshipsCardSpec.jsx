import React from 'react'
import {shallow} from 'enzyme'
import RelationshipsCard from 'common/RelationshipsCard'
import {EmptyRelationships} from 'common/Relationships'
import RelationshipsScreeningContainer from 'screenings/RelationshipsContainer'
import RelationshipsSnapshotContainer from 'containers/snapshot/RelationshipsContainer'

describe('RelationshipsCard', () => {
  const renderRelationshipsCard = (props) => (
    shallow(<RelationshipsCard {...props}/>, {disableLifecycleMethods: true})
  )

  it('renders an empty relationships component when there are no relationships', () => {
    const component = renderRelationshipsCard({areRelationshipsEmpty: true})
    expect(component.find('CardView').props().show).toEqual(<EmptyRelationships />)
  })

  it('renders screening relationships container when there are relationships on screening page', () => {
    const component = renderRelationshipsCard({areRelationshipsEmpty: false, isScreening: true})
    expect(component.find('CardView').props().show).toEqual(<RelationshipsScreeningContainer />)
    expect(component.find('CardView').props().show).not.toEqual(<RelationshipsSnapshotContainer />)
  })

  it('renders snapshot relationships container when there are relationships on snapshot page', () => {
    const component = renderRelationshipsCard({areRelationshipsEmpty: false, isScreening: false})
    expect(component.find('CardView').props().show).not.toEqual(<RelationshipsScreeningContainer />)
    expect(component.find('CardView').props().show).toEqual(<RelationshipsSnapshotContainer />)
  })
})
