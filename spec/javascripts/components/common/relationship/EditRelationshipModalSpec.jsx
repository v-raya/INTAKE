import React from 'react'
import {shallow} from 'enzyme'
import {ModalComponent} from 'react-wood-duck'
import ActionRow from 'screenings/ActionRow'
import EditRelationshipForm from 'common/relationship/EditRelationshipForm'
import EditRelationshipModal from 'common/relationship/EditRelationshipModal'

describe('EditRelationshipModal', () => {
  const props = {
    editFormRelationship: {
      absent_parent_code: 'Y',
      endDate: '2010-10-01',
      relationshipId: '12345',
      type_code: '210',
      relativeId: 'ABC987',
      same_home_code: 'N',
      startDate: '1999-10-01',
    },
    person: {
      age: '20 yrs',
      legacy_id: '1',
      gender: 'M',
      name: 'Luke Skywalker',
    },
    relationship: {
      absent_parent_code: 'Y',
      name: 'Darth Vader',
      age: '30 yrs',
      gender: 'M',
      secondaryRelationship: 'Father',
      same_home_code: 'N',
      type_code: '210',
    },
    show: true,
  }
  const render = ({
    closeModal = () => {},
    onSave = () => {},
    ...props
  } = {}) => shallow(<EditRelationshipModal closeModal={closeModal} onSave={onSave} {...props}/>)

  describe('rendersModal', () => {
    it('renders a ModalComponent', () => {
      expect(render(props).find(ModalComponent).length).toBe(1)
    })
  })

  describe('renderFooter', () => {
    it('renders ActionRow', () => {
      expect(render(props).find(ModalComponent).shallow().find(ActionRow).length).toBe(1)
    })
    it('passes the isSaving props to Action row', () => {
      expect(
        render({...props, isSaving: true})
          .find(ModalComponent)
          .shallow()
          .find(ActionRow)
          .prop('isSaving')
      ).toBe(true)
    })
    it('passes the isDisabled props to Action row', () => {
      expect(
        render({...props, isFormChanged: true})
          .find(ModalComponent)
          .shallow()
          .find(ActionRow)
          .prop('isDisabled')
      ).toBe(true)
    })
  })

  describe('renderEditRelationshipForm', () => {
    const modalRender = render(props).find(ModalComponent)
    it('renders the EditRelationshipForm', () => {
      expect(modalRender.shallow().find(EditRelationshipForm).length).toBe(1)
    })
    it('passes the props to EditRelationshipForm', () => {
      const render = modalRender.shallow().find(EditRelationshipForm)
      expect(render.prop('person')).toEqual({
        age: '20 yrs',
        legacy_id: '1',
        gender: 'M',
        name: 'Luke Skywalker',
      })
      expect(render.prop('relationship')).toEqual({
        absent_parent_code: 'Y',
        name: 'Darth Vader',
        age: '30 yrs',
        gender: 'M',
        secondaryRelationship: 'Father',
        same_home_code: 'N',
        type_code: '210',
      })
    })
  })
})
