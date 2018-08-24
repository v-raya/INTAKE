import {fromFerbRelationship} from 'data/relationship'
import {fromJS, Map} from 'immutable'
import * as matchers from 'jasmine-immutable-matchers'

describe('Relationship', () => {
  beforeEach(() => jasmine.addMatchers(matchers))

  describe('fromFerbRelationship', () => {
    it('returns an Immutable Map', () => {
      expect(Map.isMap(fromFerbRelationship(Map(), Map()))).toEqual(true)
    })

    it('returns a Map with transform relationship', () => {
      const relationship = fromJS({
        absent_parent_code: 'N',
        endDate: '',
        type_code: '190',
        id: '808',
        same_home_code: 'N',
        startDate: '',
      })
      const person = fromJS({id: '1'})
      const ferbRelationship = fromFerbRelationship(person, relationship)

      expect(ferbRelationship).toEqualImmutable(fromJS({
        absent_parent_indicator: false,
        client_id: '1',
        end_date: '',
        legacy_id: '',
        relationship_type: 190,
        relative_id: '808',
        same_home_status: 'N',
        start_date: '',
      }))
    })

    it('handles the absent parent indicator to a boolean to true when Y', () => {
      const relationship = fromJS({
        absent_parent_code: 'Y',
        endDate: '',
        type_code: '190',
        id: '808',
        same_home_code: 'N',
        startDate: '',
      })
      const person = fromJS({id: '1'})
      const ferbRelationship = fromFerbRelationship(person, relationship)

      expect(ferbRelationship).toEqualImmutable(fromJS({
        absent_parent_indicator: true,
        client_id: '1',
        end_date: '',
        legacy_id: '',
        relationship_type: 190,
        relative_id: '808',
        same_home_status: 'N',
        start_date: '',
      }))
    })
  })
})
