import React from 'react'
import {shallow} from 'enzyme'
import ActionMenu from 'common/ActionMenu'

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
  const renderRelationshipsModal = (props) =>
    shallow(<ActionMenu {...props}/>, {disableLifecycleMethods: true})

  it('renders a span', () => {
    expect(renderRelationshipsModal(props).find('span').length).toBe(1)
  })
  it('renders an unordered list', () => {
    expect(renderRelationshipsModal(props).find('ul').length).toBe(1)
  })

  describe('#callAttachLink', () => {
    it('renders a link Attach when it returns an element ', () => {
      expect(renderRelationshipsModal(props).find('a').length).toBe(1)
    })
    it('does not render in the dropdown menu when attachLink returns empty', () => {
      const noAttachedLinkProps = {
        isScreening: true,
        onClick: () => {},
        pendingPeople: ['1'],
        screeningId: '1',
        relationship: {
          legacy_descriptor: {legacy_id: '1'},
          name: 'Gohan',
          type: 'son',
          person_card_exists: true,
        },
      }
      expect(renderRelationshipsModal(noAttachedLinkProps).find('a').length).toBe(0)
    })
  })
})