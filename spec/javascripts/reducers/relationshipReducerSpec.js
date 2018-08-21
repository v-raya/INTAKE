import * as matchers from 'jasmine-immutable-matchers'
import relationshipReducer from 'reducers/relationshipReducer'
import {
  createRelationship,
  setRelationshipForm,
  updateRelationshipFailure,
  updateRelationshipSuccess,
} from 'actions/relationshipActions'
import {Map, fromJS} from 'immutable'

describe('relationshipReducer', () => {
  beforeEach(() => jasmine.addMatchers(matchers))

  describe('on CREATE_RELATIONSHIP', () => {
    it('returns a relationship immutable map on', () => {
      const person = {id: 'ZXY123'}
      const relationship = {
        absent_parent_code: 'Y',
        endDate: '2010-10-01',
        relationshipId: '12345',
        type_code: '190',
        relativeId: 'ABC987',
        reversed: false,
        same_home_code: 'Y',
        startDate: '1999-10-01',
      }
      const action = createRelationship(person, relationship)

      expect(relationshipReducer(Map(), action)).toEqualImmutable(
        fromJS({
          absent_parent_indicator: true,
          client_id: 'ZXY123',
          end_date: '2010-10-01',
          id: '12345',
          relationship_type: 190,
          relative_id: 'ABC987',
          reversed: false,
          same_home_status: 'Y',
          start_date: '1999-10-01',
        })
      )
    })
  })

  describe('on SET_RELATIONSHIP_FORM_FIELD', () => {
    it('returns the update form state', () => {
      const relationship = fromJS({
        absent_parent_indicator: true,
        client_id: 'ZXY123',
        end_date: '2010-10-01',
        id: '12345',
        relationship_type: 190,
        relative_id: 'ABC987',
        reversed: false,
        same_home_status: 'Y',
        start_date: '1999-10-01',
      })
      const lastState = fromJS(relationship)
      const actionRelationshipTye = setRelationshipForm('relationship_type', 191)
      expect(relationshipReducer(lastState, actionRelationshipTye)).toEqualImmutable(
        fromJS({
          absent_parent_indicator: true,
          client_id: 'ZXY123',
          end_date: '2010-10-01',
          id: '12345',
          relationship_type: 191,
          relative_id: 'ABC987',
          reversed: false,
          same_home_status: 'Y',
          start_date: '1999-10-01',
        })
      )
      const actionAbsentParent = setRelationshipForm('absent_parent_indicator', false)
      expect(relationshipReducer(lastState, actionAbsentParent)).toEqualImmutable(
        fromJS({
          absent_parent_indicator: false,
          client_id: 'ZXY123',
          end_date: '2010-10-01',
          id: '12345',
          relationship_type: 190,
          relative_id: 'ABC987',
          reversed: false,
          same_home_status: 'Y',
          start_date: '1999-10-01',
        })
      )
    })
  })

  describe('on UPDATE_RELATIONSHIP_COMPLETE', () => {
    it('returns the relationship with updated on success', () => {
      const relationship = {
        absent_parent_code: 'Y',
        endDate: '2010-10-01',
        relationshipId: '12345',
        type_code: '190',
        relativeId: 'ABC987',
        reversed: false,
        same_home_code: 'Y',
        startDate: '1999-10-01',
      }
      const action = updateRelationshipSuccess(relationship)
      expect(relationshipReducer(fromJS(relationship), action)).toEqualImmutable(fromJS({
        absent_parent_code: 'Y',
        endDate: '2010-10-01',
        relationshipId: '12345',
        type_code: '190',
        relativeId: 'ABC987',
        reversed: false,
        same_home_code: 'Y',
        startDate: '1999-10-01',
      }))
    })

    it('returns the last state on failure', () => {
      const action = updateRelationshipFailure()
      expect(relationshipReducer(Map(), action)).toEqualImmutable(Map())
    })
  })
})
