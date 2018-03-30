import {fromJS} from 'immutable'
import {getClientIdsSelector} from 'selectors/clientSelectors'

describe('clientSelectors', () => {
  describe('getClientIdsSelector', () => {
    it('should select ids from legacy_id field', () => {
      const state = fromJS({
        participants: [{
          legacy_id: 'ABC',
        }],
      })

      expect(getClientIdsSelector(state)).toEqual(['ABC'])
    })

    it('should select ids from legacy_descriptor', () => {
      const state = fromJS({
        participants: [{
          legacy_descriptor: {
            legacy_id: 'DEF',
          },
        }],
      })

      expect(getClientIdsSelector(state)).toEqual(['DEF'])
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

      expect(getClientIdsSelector(state)).toEqual(['DEF'])
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

      expect(getClientIdsSelector(state)).toEqual(['ABC', 'DEF'])
    })
  })
})
