import {fromJS, List, Map} from 'immutable'
import {
  selectClientIds,
  selectParticipant,
  selectParticipants,
  selectRoles,
  selectAllRoles,
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

  describe('selectRoles', () => {
    it('should return the list of roles for a participant', () => {
      const roles = List(['Victim', 'Perpatrator', 'Master of the Universe'])
      const participant = Map().set('roles', roles)

      expect(selectRoles(participant)).toEqual(roles)
    })

    it('should return an empty list for a participant with no roles', () => {
      const participant = Map()
      expect(selectRoles(participant)).toEqualImmutable(List())
    })
  })

  describe('selectAllRoles', () => {
    it('should combine all roles present on participants', () => {
      const participants = fromJS([
        {roles: ['Victim']},
        {roles: ['Perpetrator']},
        {roles: ['Master of the Universe']},
      ])
      const state = Map().set('participants', participants)
      expect(selectAllRoles(state)).toEqualImmutable(List([
        'Victim',
        'Perpetrator',
        'Master of the Universe',
      ]))
    })

    it('should remove duplicate roles', () => {
      const participants = fromJS([
        {roles: ['Victim']},
        {roles: ['Victim']},
        {roles: ['Master of the Universe']},
      ])
      const state = Map().set('participants', participants)
      expect(selectAllRoles(state)).toEqualImmutable(List([
        'Victim',
        'Master of the Universe',
      ]))
    })

    it('should include all of a person\'s roles', () => {
      const participants = fromJS([
        {roles: ['Victim', 'Perpetrator']},
        {roles: ['Judge', 'Jury', 'Executioner']},
        {roles: ['Master of the Universe']},
      ])
      const state = Map().set('participants', participants)
      expect(selectAllRoles(state)).toEqualImmutable(List([
        'Victim',
        'Perpetrator',
        'Judge',
        'Jury',
        'Executioner',
        'Master of the Universe',
      ]))
    })

    it('should handle people with no roles', () => {
      const participants = fromJS([
        {},
        {roles: []},
        {roles: ['Master of the Universe']},
      ])
      const state = Map().set('participants', participants)
      expect(selectAllRoles(state)).toEqualImmutable(List([
        'Master of the Universe',
      ]))
    })

    it('should return an empty list by default', () => {
      const participants = fromJS([
        {},
      ])
      const state = Map().set('participants', participants)
      expect(selectAllRoles(state)).toEqualImmutable(List())
    })
  })
})
