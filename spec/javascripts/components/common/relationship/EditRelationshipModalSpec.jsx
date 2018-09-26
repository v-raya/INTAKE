import React from 'react'
import {shallow} from 'enzyme'
import {ModalComponent} from 'react-wood-duck'
import EditRelationshipForm from 'common/relationship/EditRelationshipForm'
import EditRelationshipModal from 'common/relationship/EditRelationshipModal'

describe('EditRelationshipModal', () => {
  const props = {
    closeModal: () => {},
    onClick: () => {},
    onSave: () => {},
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
  const renderEditRelationshipModal = (props) => shallow(<EditRelationshipModal {...props}/>)

  describe('rendersModal', () => {
    it('renders a ModalComponent', () => {
      expect(renderEditRelationshipModal(props).find(ModalComponent).length).toBe(1)
    })
  })

  describe('renderFooter', () => {
    it('renders two buttons', () => {
      expect(
        renderEditRelationshipModal(props).find(ModalComponent).shallow().find('button').length
      ).toBe(2)
    })
    it('renders SavingButton when isSaving props is true', () => {
      expect(
        renderEditRelationshipModal({...props, isSaving: true})
          .find(ModalComponent)
          .shallow()
          .find('SavingButton').length
      ).toBe(1)
    })
  })

  describe('renderEditRelationshipForm', () => {
    const modalRender = renderEditRelationshipModal(props).find(ModalComponent)

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
