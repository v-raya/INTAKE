import {fromJS, List, Map} from 'immutable'
import {
  getClientIds,
  selectParticipants,
} from 'selectors/participantSelectors'
import * as matchers from 'jasmine-immutable-matchers'

describe('participantSelectors', () => {
  beforeEach(() => jasmine.addMatchers(matchers))

  describe('selectParticipants', () => {
    it('should select participants from state', () => {
      const state = fromJS({
        participants: [
          {id: '1', first_name: 'Mario'},
          {id: '2', first_name: 'Luigi'},
          {id: '3', first_name: 'Peach'},
        ],
      })

      expect(selectParticipants(state)).toEqualImmutable(state.get('participants'))
    })

    it('should select an empty list if no participants', () => {
      expect(selectParticipants(Map())).toEqualImmutable(List())
    })
  })

  describe('getClientIds', () => {
    it('should select ids from legacy_id field', () => {
      const state = fromJS({
        participants: [{
          legacy_id: 'ABC',
        }],
      })

      expect(getClientIds(state)).toEqual(['ABC'])
    })

    it('should select ids from legacy_descriptor', () => {
      const state = fromJS({
        participants: [{
          legacy_descriptor: {
            legacy_id: 'DEF',
          },
        }],
      })

      expect(getClientIds(state)).toEqual(['DEF'])
    })

    it('should bypass null legacy_ids', () => {
      const state = fromJS({
        participants: [{
          legacy_id: null,
          legacy_descriptor: {
            legacy_id: 'DEF',
          },
        }],
      })

      expect(getClientIds(state)).toEqual(['DEF'])
    })

    it('should select multiple clients', () => {
      const state = fromJS({
        participants: [{
          legacy_id: 'ABC',
        },
        {
          legacy_descriptor: {
            legacy_id: 'DEF',
          },
        }],
      })

      expect(getClientIds(state)).toEqual(['ABC', 'DEF'])
    })
  })
})
