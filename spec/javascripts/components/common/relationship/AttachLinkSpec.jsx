import React from 'react'
import {shallow} from 'enzyme'
import AttachLink from 'common/relationship/AttachLink'

describe('AttachLink', () => {
  let onClick

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
  const renderAttachLink = (props) => shallow(<AttachLink {...props} onClick={onClick}/>)

  beforeEach(() => {
    onClick = jasmine.createSpy('onClick')
  })

  it('renders a link Attach when it returns an element ', () => {
    expect(renderAttachLink(props).find('a').length).toBe(1)
  })

  it('does not generate any dom element', () => {
    expect(renderAttachLink(noAttachedLinkProps).find('a').length).toBe(0)
  })

  it('calls onClick when the Attach Link is clicked', () => {
    renderAttachLink(props).simulate('click')
    expect(onClick).toHaveBeenCalled()
    expect(onClick).toHaveBeenCalledWith({name: 'Gohan', type: 'son', person_card_exists: true}, '1')
  })

  it('has href and aria-label', () => {
    expect(renderAttachLink(props).find('a[aria-label="Attach Relationship"]').props().href)
      .toBe('#attach')
  })
})
