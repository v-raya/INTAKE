import * as matchers from 'jasmine-immutable-matchers'
import {
  createPersonSuccess,
  createPersonFailure,
  createSnapshotPerson,
} from 'actions/personCardActions'
import pendingParticipantsReducer from 'reducers/pendingParticipantsReducer'
import {List, fromJS} from 'immutable'

describe('pendingParticipantsReducer', () => {
  beforeEach(() => jasmine.addMatchers(matchers))

  describe('on CREATE_SNAPSHOT_PERSON', () => {
    it('adds new pending participants to the beginning of the list', () => {
      const newId = '2'
      const action = createSnapshotPerson(newId)
      const oldId = '3'
      const oldState = fromJS([oldId])
      const expectedState = fromJS([newId, oldId])
      expect(pendingParticipantsReducer(oldState, action)).toEqualImmutable(expectedState)
    })
  })
  describe('on CREATE_PERSON_COMPLETE', () => {
    it('returns the pending participants without the completed participant', () => {
      const firstId = '2'
      const secondId = '3'
      const oldState = fromJS([firstId, secondId])
      const action = createPersonSuccess({id: secondId})
      const expectedState = fromJS([firstId])
      expect(pendingParticipantsReducer(oldState, action)).toEqualImmutable(expectedState)
    })
    it('returns the pending particpants without the completed participant using legacy descriptor', () => {
      const firstId = '2'
      const secondId = '3'
      const legacyId = '9GAG'
      const oldState = fromJS([firstId, secondId, legacyId])
      const action = createPersonSuccess({id: '4', legacy_descriptor: {legacy_id: '9GAG'}})
      const expectedState = fromJS([firstId, secondId])
      expect(pendingParticipantsReducer(oldState, action)).toEqualImmutable(expectedState)
    })
    it('returns the pending participant even with legacy_id is undefined', () => {
      const firstId = '2'
      const secondId = '3'
      const legacyId = '9GAG'
      const oldState = fromJS([firstId, secondId, legacyId])
      const action = createPersonSuccess({id: '5', legacy_descriptor: {hello: '9GAG'}})
      const expectedState = fromJS([firstId, secondId, legacyId])
      expect(pendingParticipantsReducer(oldState, action)).toEqualImmutable(expectedState)
    })
    it('returns all the pending participant even with legacy_id defined', () => {
      const firstId = '2'
      const secondId = '3'
      const legacyId = '9GAG'
      const oldState = fromJS([firstId, secondId, legacyId])
      const action = createPersonSuccess({id: '5', legacy_descriptor: {legacy_id: 'DBZ'}})
      const expectedState = fromJS([firstId, secondId, legacyId])
      expect(pendingParticipantsReducer(oldState, action)).toEqualImmutable(expectedState)
    })
    it('returns all the pending participants without the complete participant using legacy_id field', () => {
      const firstId = '2'
      const secondId = '3'
      const legacyId = 'DBZ'
      const oldState = fromJS([firstId, secondId, legacyId])
      const action = createPersonSuccess({id: '5', legacy_id: 'DBZ'})
      const expectedState = fromJS([firstId, secondId])
      expect(pendingParticipantsReducer(oldState, action)).toEqualImmutable(expectedState)
    })
    it('returns the last state on failure', () => {
      const action = createPersonFailure()
      expect(pendingParticipantsReducer(List(), action)).toEqual(List())
    })
  })
})
