import * as matchers from 'jasmine-immutable-matchers'
import relationshipReducer from 'reducers/relationshipReducer'
import {createRelationship} from 'actions/relationshipActions'
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
        indexed_person_relationship: '190',
        relative_id: 'ABC987',
        reverted: false,
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
          reverted: false,
          same_home_status: 'Y',
          start_date: '1999-10-01',
        })
      )
    })
  })
})
