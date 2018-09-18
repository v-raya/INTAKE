import {createPerson} from 'actions/personCardActions'
import {
  loadRelationship,
  setRelationshipForm,
  updateRelationship,
} from 'actions/relationshipFormActions'
import {mapDispatchToProps} from 'screenings/RelationshipsContainer'

describe('RelationshipsContainer', () => {
  describe('mapDispatchToProps', () => {
    let dispatch
    let props
    beforeEach(() => {
      dispatch = jasmine.createSpy('dispatch')
      props = mapDispatchToProps(dispatch)
    })
    describe('when onClick', () => {
      it('calls createPerson with relationship person', () => {
        const {onClick} = props
        const relationship = {
          legacy_descriptor: {
            legacy_id: 'sharingan',
            legacy_table_name: 'uchiha',
          },
        }
        onClick(relationship, 805)
        expect(dispatch).toHaveBeenCalledWith(createPerson({
          screening_id: 805,
          legacy_descriptor: {
            legacy_id: 'sharingan',
            legacy_source_table: 'uchiha',
          },
        }))
      })
    })
    describe('when onChange', () => {
      it('calls setRelationshipForm with field and value', () => {
        const {onChange} = props
        onChange('relationshipType', 101)
        expect(dispatch).toHaveBeenCalledWith(setRelationshipForm('relationshipType', 101))
      })
    })
    describe('when onEdit', () => {
      it('calls loadRelationship with person and relationship', () => {
        const {onEdit} = props
        onEdit('goku', 'gohan')
        expect(dispatch).toHaveBeenCalledWith(loadRelationship('goku', 'gohan'))
      })
    })
    describe('when onSave', () => {
      it('calls updateRelationship with person id', () => {
        const {onSave} = props
        onSave('805')
        expect(dispatch).toHaveBeenCalledWith(updateRelationship('805'))
      })
    })
  })
})
