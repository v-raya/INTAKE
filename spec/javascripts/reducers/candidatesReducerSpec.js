import * as matchers from 'jasmine-immutable-matchers'
import candidatesReducer from 'reducers/candidatesReducer'
import {loadCreateRelationshipsCandidates} from 'actions/relationshipsActions'
import {List, fromJS} from 'immutable'

describe('candidatesReducer', () => {
  const RELATIONSHIP_TYPE = [
    {value: '179', label: 'Brother/Brother'},
    {value: '185', label: 'Cousin/Cousin (Maternal)'},
  ]
  beforeEach(() => jasmine.addMatchers(matchers))

  describe('on LOAD_CANDIDATES_RELATIONSHIPS', () => {
    it('returns an empty immutable list', () => {
      const action = loadCreateRelationshipsCandidates([])

      expect(candidatesReducer(List(), action)).toEqualImmutable(List())
    })

    it('returns candidates relationships immutable list', () => {
      const candidates = [{
        person: {id: 'ZXY123'},
        candidate: {id: 'RED987', type_code: RELATIONSHIP_TYPE[0].value},
      }, {
        person: {id: 'ZXY123'},
        candidate: {id: 'BLUE987', type_code: RELATIONSHIP_TYPE[1].value},
      }]
      const action = loadCreateRelationshipsCandidates(candidates)

      expect(candidatesReducer(List(), action)).toEqualImmutable(
        fromJS([{
          absent_parent_indicator: false,
          client_id: 'ZXY123',
          end_date: '',
          legacy_id: '',
          relationship_type: 179,
          relative_id: 'RED987',
          same_home_status: 'N',
          start_date: '',
        }, {
          absent_parent_indicator: false,
          client_id: 'ZXY123',
          end_date: '',
          legacy_id: '',
          relationship_type: 185,
          relative_id: 'BLUE987',
          same_home_status: 'N',
          start_date: '',
        }])
      )
    })
  })
})
