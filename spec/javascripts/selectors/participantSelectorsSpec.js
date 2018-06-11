import {fromJS} from 'immutable'
import {getClientIds} from 'selectors/participantSelectors'

describe('participantSelectors', () => {
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
