import {fromJS, List, Map} from 'immutable'
import {
  selectClientIds,
  selectParticipant,
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

  describe('selectParticipant', () => {
    const state = fromJS({
      participants: [
        {id: '1', first_name: 'Mario'},
        {id: '2', first_name: 'Luigi'},
        {id: '3', first_name: 'Peach'},
      ],
    })
    it('should select a Maybe of a participant from state', () => {
      const participant = selectParticipant(state, '1')
      expect(participant.isSomething()).toEqual(true)
      expect(participant.valueOrElse()).toEqualImmutable(
        fromJS({id: '1', first_name: 'Mario'})
      )
    })

    it('should select nothing when participant not found', () => {
      expect(selectParticipant(state, '0').isNothing()).toEqual(true)
    })

    it('should select nothing when there are no participants', () => {
      expect(selectParticipant(Map(), '1').isNothing()).toEqual(true)
    })
  })

  describe('selectClientIds', () => {
    it('should select ids from legacy_id field', () => {
      const state = fromJS({
        participants: [{
          legacy_id: 'ABC',
        }],
      })

      expect(selectClientIds(state)).toEqual(['ABC'])
    })

    it('should select ids from legacy_descriptor', () => {
      const state = fromJS({
        participants: [{
          legacy_descriptor: {
            legacy_id: 'DEF',
          },
        }],
      })

      expect(selectClientIds(state)).toEqual(['DEF'])
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

      expect(selectClientIds(state)).toEqual(['DEF'])
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

      expect(selectClientIds(state)).toEqual(['ABC', 'DEF'])
    })
  })
})
