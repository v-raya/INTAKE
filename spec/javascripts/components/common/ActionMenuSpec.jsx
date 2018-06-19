import React from 'react'
import {shallow} from 'enzyme'
import ActionMenu from 'common/ActionMenu'
import AttachLink from 'common/AttachLink'

describe('ActionMenu', () => {
  const props = {
    isScreening: true,
    onClick: () => {},
    pendingPeople: [],
    screeningId: '1',
    relationship: {
      name: 'Gohan',
      type: 'son',
      person_card_exists: true,
    },
  }
  const renderActionMenu = (props) => shallow(<ActionMenu {...props}/>)

  it('renders a span', () => {
    expect(renderActionMenu(props).find('span').length).toBe(1)
  })

  it('renders an unordered list', () => {
    expect(renderActionMenu(props).find('ul').length).toBe(1)
  })

  it('renders AttachLink component', () => {
    expect(renderActionMenu(props).find(AttachLink).length).toBe(1)
  })
})
