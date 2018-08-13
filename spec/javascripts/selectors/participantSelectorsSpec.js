import {fromJS, List, Map} from 'immutable'
import {
  selectClientIds,
  selectParticipant,
  selectParticipants,
  selectParticipantsForAPI,
  selectRoles,
  selectAllRoles,
  selectFormattedAddresses,
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

  describe('selectParticipantsForAPI', () => {
    it('should select participants from state', () => {
      const state = fromJS({
        participants: [
          {id: '1', first_name: 'Mario', addresses: []},
          {id: '2', first_name: 'Luigi', addresses: []},
          {id: '3', first_name: 'Peach', addresses: []},
        ],
      })

      expect(selectParticipantsForAPI(state)).toEqualImmutable(state.get('participants'))
    })

    it('should update address format for posting to Ferb', () => {
      const state = fromJS({
        participants: [{
          id: '1',
          first_name: 'Mario',
          addresses: [{
            id: '1',
            street: '1000 Peach Castle',
            city: 'World 1-1',
            state: 'Mushroom Kingdom',
            zip: '00001',
            type: 'Home',
            legacy_descriptor: {legacy_id: 'ABC123'},
          }],
        }],
      })

      expect(
        selectParticipantsForAPI(state).first().get('addresses')
      ).toEqualImmutable(fromJS([{
        id: '1',
        street_address: '1000 Peach Castle',
        city: 'World 1-1',
        state: 'Mushroom Kingdom',
        zip: '00001',
        type: 'Home',
        legacy_descriptor: {legacy_id: 'ABC123'},
      }]))
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

  describe('selectFormattedAddresses', () => {
    it('returns info for the person with the passed id', () => {
      const people = [
        {id: '1', addresses: [{type: 'Residence'}]},
        {id: '2', addresses: [{type: 'Cell'}]},
      ]
      const state = fromJS({participants: people})
      expect(selectFormattedAddresses(state, '1').first().get('type'))
        .toEqual('Residence')
    })

    it('returns an empty array if no addresses exists for the person', () => {
      const people = [{id: '1'}]
      const state = fromJS({participants: people})
      expect(selectFormattedAddresses(state, '1')).toEqualImmutable(List())
    })

    it('returns the street for an address', () => {
      const people = [{id: '1', addresses: [{street: '1234 Nowhere Lane'}]}]
      const state = fromJS({participants: people})
      expect(selectFormattedAddresses(state, '1').first().get('street'))
        .toEqual('1234 Nowhere Lane')
    })

    it('returns the city for an address', () => {
      const people = [{id: '1', addresses: [{city: 'Somewhereville'}]}]
      const state = fromJS({participants: people})
      expect(selectFormattedAddresses(state, '1').first().get('city'))
        .toEqual('Somewhereville')
    })

    it('returns the formatted state for an address', () => {
      const people = [{id: '1', addresses: [{state: 'CA'}]}]
      const state = fromJS({participants: people})
      expect(selectFormattedAddresses(state, '1').first().get('state'))
        .toEqual('California')
    })

    it('returns an empty string for an invalid state', () => {
      const people = [{id: '1', addresses: [{state: ''}]}]
      const state = fromJS({participants: people})
      expect(selectFormattedAddresses(state, '1').first().get('state'))
        .toEqual('')
    })

    it('returns the zip for an address', () => {
      const people = [{id: '1', addresses: [{zip: '12345'}]}]
      const state = fromJS({participants: people})
      expect(selectFormattedAddresses(state, '1').first().get('zip'))
        .toEqual('12345')
    })

    it('returns the zip errors for an address', () => {
      const people = [{id: '1', addresses: [{zip: '1234'}]}]
      const state = fromJS({participants: people})
      expect(selectFormattedAddresses(state, '1').first().get('zipError'))
        .toEqual(['zip code should be 5 digits'])
    })

    it('returns the type for an address', () => {
      const people = [{id: '1', addresses: [{type: 'Residence'}]}]
      const state = fromJS({participants: people, addressTypes: [{value: 'Residence'}]})
      expect(selectFormattedAddresses(state, '1').first().get('type'))
        .toEqual('Residence')
    })
  })
})
