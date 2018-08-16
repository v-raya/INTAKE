import * as matchers from 'jasmine-immutable-matchers'
import {
  createScreeningSuccess,
  createScreeningFailure,
  fetchScreeningSuccess,
  fetchScreeningFailure,
  saveSuccess,
} from 'actions/screeningActions'
import {
  createPersonSuccess,
  createPersonFailure,
  deletePersonSuccess,
  deletePersonFailure,
  updatePersonSuccess,
  updatePersonFailure,
  clearPeople,
} from 'actions/personCardActions'
import participantsReducer from 'reducers/participantsReducer'
import {List, fromJS} from 'immutable'

describe('participantsReducer', () => {
  const participants = [{
    id: '1',
    addresses: [],
  }, {
    id: '2',
    addresses: [{
      id: '1',
      street_address: '123 Main St',
      city: 'Sacramento',
      state: 'CA',
      zip: '95811',
      type: 'Home',
      legacy_descriptor: {legacy_id: '123ABC'},
    }, {
      id: '2',
      street_address: '456 New Drive',
      city: 'Folsom',
      state: 'CA',
      zip: '95812',
      type: 'Home',
    }],
  }]
  beforeEach(() => jasmine.addMatchers(matchers))

  describe('on CREATE_SCREENING_COMPLETE', () => {
    it('returns the participants from the action on success', () => {
      const screening = fromJS({participants: []})
      const action = createScreeningSuccess(screening.toJS())
      expect(participantsReducer(List(), action).isEmpty()).toEqual(true)
    })
    it('transforms the addresses of the participants', () => {
      const screening = fromJS({participants})
      const action = createScreeningSuccess(screening.toJS())
      const result = participantsReducer(List(), action)
      expect(result.first().get('addresses')).toEqualImmutable(List())
      expect(result.get(1).get('addresses')).toEqualImmutable(fromJS([{
        id: '1',
        street: '123 Main St',
        city: 'Sacramento',
        state: 'CA',
        zip: '95811',
        type: 'Home',
        legacy_descriptor: {legacy_id: '123ABC'},
      }, {
        id: '2',
        street: '456 New Drive',
        city: 'Folsom',
        state: 'CA',
        zip: '95812',
        type: 'Home',
        legacy_descriptor: null,
      }]))
    })
    it('returns the last state on failure', () => {
      const action = createScreeningFailure()
      expect(participantsReducer(List(), action)).toEqual(List())
    })
  })

  describe('on FETCH_SCREENING_COMPLETE', () => {
    it('returns the participants from the action on success', () => {
      const screening = fromJS({participants: [{id: '2', addresses: []}]})
      const participants = screening.get('participants')
      const action = fetchScreeningSuccess(screening.toJS())
      expect(participantsReducer(List(), action)).toEqualImmutable(participants)
    })
    it('transforms the addresses of the participants', () => {
      const screening = fromJS({participants})
      const action = fetchScreeningSuccess(screening.toJS())
      const result = participantsReducer(List(), action)
      expect(result.first().get('addresses')).toEqualImmutable(List())
      expect(result.get(1).get('addresses')).toEqualImmutable(fromJS([{
        id: '1',
        street: '123 Main St',
        city: 'Sacramento',
        state: 'CA',
        zip: '95811',
        type: 'Home',
        legacy_descriptor: {legacy_id: '123ABC'},
      }, {
        id: '2',
        street: '456 New Drive',
        city: 'Folsom',
        state: 'CA',
        zip: '95812',
        type: 'Home',
        legacy_descriptor: null,
      }]))
    })
    it('returns the last state on failure', () => {
      const action = fetchScreeningFailure()
      expect(participantsReducer(List(), action)).toEqual(List())
    })
  })

  describe('on SAVE_SCREENING_COMPLETE', () => {
    it('returns the screening from the action on success', () => {
      const screening = fromJS({participants: [{id: '2', addresses: []}]})
      const participants = screening.get('participants')
      const action = saveSuccess(screening.toJS())
      expect(participantsReducer(List(), action)).toEqualImmutable(participants)
    })
    it('transforms the addresses of the participants', () => {
      const screening = fromJS({participants})
      const action = saveSuccess(screening.toJS())
      const result = participantsReducer(List(), action)
      expect(result.first().get('addresses')).toEqualImmutable(List())
      expect(result.get(1).get('addresses')).toEqualImmutable(fromJS([{
        id: '1',
        street: '123 Main St',
        city: 'Sacramento',
        state: 'CA',
        zip: '95811',
        type: 'Home',
        legacy_descriptor: {legacy_id: '123ABC'},
      }, {
        id: '2',
        street: '456 New Drive',
        city: 'Folsom',
        state: 'CA',
        zip: '95812',
        type: 'Home',
        legacy_descriptor: null,
      }]))
    })
  })

  describe('on CREATE_PERSON_COMPLETE', () => {
    it('returns the screening with new participant from the action on success', () => {
      const newParticipant = fromJS({id: '2', addresses: []})
      const action = createPersonSuccess(newParticipant.toJS())
      const newParticipants = fromJS([newParticipant])
      expect(participantsReducer(List(), action)).toEqualImmutable(newParticipants)
    })

    it('adds new participants to the beginning of the list', () => {
      const newParticipant = fromJS({id: '2', addresses: []})
      const action = createPersonSuccess(newParticipant.toJS())
      const oldParticipant = {id: '3'}
      const oldState = fromJS([oldParticipant])
      const newParticipants = fromJS([newParticipant, oldParticipant])
      expect(participantsReducer(oldState, action)).toEqualImmutable(newParticipants)
    })
    it('transforms the addresses of the participant', () => {
      const newParticipant = fromJS(participants[1])
      const action = createPersonSuccess(newParticipant.toJS())
      const oldState = fromJS([participants[0]])
      const result = participantsReducer(oldState, action)
      expect(result.get(1).get('addresses')).toEqualImmutable(List())
      expect(result.first().get('addresses')).toEqualImmutable(fromJS([{
        id: '1',
        street: '123 Main St',
        city: 'Sacramento',
        state: 'CA',
        zip: '95811',
        type: 'Home',
        legacy_descriptor: {legacy_id: '123ABC'},
      }, {
        id: '2',
        street: '456 New Drive',
        city: 'Folsom',
        state: 'CA',
        zip: '95812',
        type: 'Home',
        legacy_descriptor: null,
      }]))
    })
    it('returns the last state on failure', () => {
      const action = createPersonFailure()
      expect(participantsReducer(List(), action)).toEqual(List())
    })
  })

  describe('on UPDATE_PERSON_COMPLETE', () => {
    it('returns the screening with updated participants from the action on success', () => {
      const newParticipant = {id: '1', first_name: 'John', addresses: []}
      const oldParticipant = {id: '1', addresses: []}
      const oldState = fromJS([oldParticipant])
      const newParticipants = fromJS([newParticipant])
      const action = updatePersonSuccess(newParticipant)
      expect(participantsReducer(oldState, action)).toEqualImmutable(newParticipants)
    })
    it('transforms the addresses of the participant', () => {
      const newParticipant = fromJS(participants[1])
      const action = createPersonSuccess(newParticipant.toJS())
      const oldState = fromJS([participants[0]])
      const result = participantsReducer(oldState, action)
      expect(result.first().get('addresses')).toEqualImmutable(fromJS([{
        id: '1',
        street: '123 Main St',
        city: 'Sacramento',
        state: 'CA',
        zip: '95811',
        type: 'Home',
        legacy_descriptor: {legacy_id: '123ABC'},
      }, {
        id: '2',
        street: '456 New Drive',
        city: 'Folsom',
        state: 'CA',
        zip: '95812',
        type: 'Home',
        legacy_descriptor: null,
      }]))
    })
    it('returns the last state on failure', () => {
      const action = updatePersonFailure()
      expect(participantsReducer(List(), action)).toEqual(List())
    })
  })

  describe('on DELETE_PERSON_COMPLETE', () => {
    it('returns the screening without the deleted participant from the action on success', () => {
      const firstParticipant = {id: '2', addresses: []}
      const secondParticipant = {id: '3', addresses: []}
      const oldState = fromJS([firstParticipant, secondParticipant])
      const action = deletePersonSuccess(secondParticipant.id)
      const newParticipants = fromJS([firstParticipant])
      expect(participantsReducer(oldState, action)).toEqualImmutable(newParticipants)
    })
    it('returns the last state on failure', () => {
      const action = deletePersonFailure()
      expect(participantsReducer(List(), action)).toEqual(List())
    })
  })

  describe('on CLEAR_PEOPLE', () => {
    it('clears all people in the particiant reducer', () => {
      const participants = [{id: '2', addresses: []}, {id: '3', addresses: []}]
      const oldState = fromJS(participants)
      const action = clearPeople()
      expect(participantsReducer(oldState, action)).toEqualImmutable(List())
    })
  })
})
