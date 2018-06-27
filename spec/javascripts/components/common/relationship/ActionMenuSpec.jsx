import React from 'react'
import {shallow} from 'enzyme'
import {ModalComponent} from 'react-wood-duck'
import ActionMenu from 'common/relationship/ActionMenu'
import AttachLink from 'common/relationship/AttachLink'

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

  it('renders an Edit Relationship link', () => {
    expect(renderActionMenu(props).find('.edit-relationship').length).toBe(1)
  })

  it('renders ModalComponent', () => {
    expect(renderActionMenu(props).find(ModalComponent).length).toBe(1)
  })

  describe('closeModal', () => {
    it('sets the state show to false', () => {
      const instance = renderActionMenu(props).instance()

      instance.setState({show: true})
      expect(instance.state.show).toBe(true)
      instance.closeModal()
      expect(instance.state.show).toBe(false)
    })
  })

  describe('handleShowModal', () => {
    it('sets the state show to true', () => {
      const instance = renderActionMenu(props).instance()

      expect(instance.state.show).toBe(false)
      instance.handleShowModal()
      expect(instance.state.show).toBe(true)
    })
  })

  describe('renderFooter', () => {
    it('renders two buttons', () => {
      const modalRender = renderActionMenu(props).find(ModalComponent)

      expect(modalRender.shallow().find('button').length).toBe(2)
    })
  })
})
