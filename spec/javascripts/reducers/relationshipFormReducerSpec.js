import * as matchers from 'jasmine-immutable-matchers'
import relationshipFormReducer from 'reducers/relationshipFormReducer'
import {
  loadRelationship,
  setRelationshipForm,
  updateRelationship,
  updateRelationshipFailure,
  updateRelationshipSuccess,
} from 'actions/relationshipFormActions'
import {fetchRelationshipsSuccess} from 'actions/relationshipsActions'
import {Map, fromJS} from 'immutable'

describe('relationshipFormReducer', () => {
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
  const relationshipForm = fromJS({
    relationship: {
      absent_parent_indicator: true,
      client_id: 'ZXY123',
      end_date: '2010-10-01',
      id: '12345',
      relationship_type: 190,
      relative_id: 'ABC987',
      reversed: false,
      same_home_status: 'Y',
      start_date: '1999-10-01',
    }})
  beforeEach(() => jasmine.addMatchers(matchers))

  describe('on FETCH_RELATIONSHIPS_COMPLETE', () => {
    it('sets the isSaving to false', () => {
      const relationships = [{id: '808'}]
      const relationshipForm = {isSaving: true}
      const lastState = fromJS(relationshipForm)
      const action = fetchRelationshipsSuccess(relationships)
      expect(
        relationshipFormReducer(lastState, action)).toEqualImmutable(fromJS({isSaving: false})
      )
    })
  })

  describe('on LOAD_RELATIONSHIP', () => {
    it('returns a relationship immutable map on', () => {
      const action = loadRelationship(person, relationship)
      expect(relationshipFormReducer(Map(), action)).toEqualImmutable(
        fromJS({
          relationship: {
            absent_parent_indicator: true,
            client_id: 'ZXY123',
            end_date: '2010-10-01',
            id: '12345',
            relationship_type: 190,
            relative_id: 'ABC987',
            reversed: false,
            same_home_status: 'Y',
            start_date: '1999-10-01',
          },
          isSaving: false,
        })
      )
    })
  })

  describe('on SET_RELATIONSHIP_FORM_FIELD', () => {
    it('returns the update form state', () => {
      const lastState = fromJS(relationshipForm)
      const actionRelationshipTye = setRelationshipForm('relationship_type', 191)
      expect(relationshipFormReducer(lastState, actionRelationshipTye)).toEqualImmutable(
        fromJS({
          relationship: {
            absent_parent_indicator: true,
            client_id: 'ZXY123',
            end_date: '2010-10-01',
            id: '12345',
            relationship_type: 191,
            relative_id: 'ABC987',
            reversed: false,
            same_home_status: 'Y',
            start_date: '1999-10-01',
          }})
      )
      const actionAbsentParent = setRelationshipForm('absent_parent_indicator', false)
      expect(relationshipFormReducer(lastState, actionAbsentParent)).toEqualImmutable(
        fromJS({
          relationship: {
            absent_parent_indicator: false,
            client_id: 'ZXY123',
            end_date: '2010-10-01',
            id: '12345',
            relationship_type: 190,
            relative_id: 'ABC987',
            reversed: false,
            same_home_status: 'Y',
            start_date: '1999-10-01',
          }})
      )
    })
  })

  describe('on UPDATE_RELATIONSHIP_COMPLETE', () => {
    it('returns the relationship with updated on success', () => {
      const lastState = fromJS(relationshipForm)
      const action = updateRelationshipSuccess(relationship)
      expect(relationshipFormReducer(lastState, action)).toEqualImmutable(fromJS({
        relationship: {
          absent_parent_code: 'Y',
          endDate: '2010-10-01',
          relationshipId: '12345',
          type_code: '190',
          relativeId: 'ABC987',
          reversed: false,
          same_home_code: 'Y',
          startDate: '1999-10-01',
        },
      }))
    })

    it('returns the last state on failure', () => {
      const action = updateRelationshipFailure()
      expect(relationshipFormReducer(Map(), action)).toEqualImmutable(Map())
    })
  })

  describe('on UPDATE_RELATIONSHIP', () => {
    it('returns the relationship with updated on success', () => {
      const state = {id: '808'}
      const action = updateRelationship(state)
      expect(relationshipFormReducer(fromJS(state), action)).toEqualImmutable(fromJS({
        id: '808',
        isSaving: true,
      }))
    })

    it('returns the last state on failure', () => {
      const action = updateRelationshipFailure()
      expect(relationshipFormReducer(Map(), action)).toEqualImmutable(Map())
    })
  })
})
