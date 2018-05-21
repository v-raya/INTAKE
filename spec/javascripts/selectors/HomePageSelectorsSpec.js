import {screeningsListSelector, snapshotEnabledSelector, hotlineEnabledSelector} from 'selectors/homePageSelectors'
import {List, fromJS} from 'immutable'
import * as IntakeConfig from 'common/config'

describe('screeningsListSelector', () => {
  it('returns a list of screenings when there are screenings', () => {
    const screenings = ['a', 'b', 'c']
    const state = fromJS({screenings})
    expect(screeningsListSelector(state)).toEqual(fromJS(screenings))
  })
  it('returns an empty list when there are no screenings', () => {
    const state = fromJS({})
    expect(screeningsListSelector(state)).toEqual(List())
  })
})

describe('snapshotEnabledSelector', () => {
  describe('when snapshot feature is active', () => {
    it('returns true if the snapshot privilege is present', () => {
      spyOn(IntakeConfig, 'isFeatureActive').and.returnValue(true)
      const state = fromJS({
        userInfo: {
          privileges: ['Snapshot-rollout'],
        },
      })
      expect(snapshotEnabledSelector(state)).toBe(true)
    })
    it('returns false if the snapshot privilege is not present', () => {
      spyOn(IntakeConfig, 'isFeatureActive').and.returnValue(true)
      const state = fromJS({
        userInfo: {
          privileges: [],
        },
      })
      expect(snapshotEnabledSelector(state)).toBe(false)
    })
  })
  describe('when snapshot feature is not active', () => {
    it('returns false if the snapshot privilege is present', () => {
      spyOn(IntakeConfig, 'isFeatureActive').and.returnValue(false)
      const state = fromJS({
        userInfo: {
          privileges: ['Snapshot-rollout'],
        },
      })
      expect(snapshotEnabledSelector(state)).toBe(false)
    })
    it('returns false if the snapshot privilege is not present', () => {
      spyOn(IntakeConfig, 'isFeatureActive').and.returnValue(false)
      const state = fromJS({
        userInfo: {
          privileges: [],
        },
      })
      expect(snapshotEnabledSelector(state)).toBe(false)
    })
  })
})

describe('hotlineEnabledSelector', () => {
  describe('when screenings feature is active', () => {
    it('returns true if the hotline privilege is present', () => {
      spyOn(IntakeConfig, 'isFeatureActive').and.returnValue(true)
      const state = fromJS({
        userInfo: {
          privileges: ['Hotline-rollout'],
        },
      })
      expect(hotlineEnabledSelector(state)).toBe(true)
    })
    it('returns false if the hotline privilege is not present', () => {
      spyOn(IntakeConfig, 'isFeatureActive').and.returnValue(true)
      const state = fromJS({
        userInfo: {
          privileges: [],
        },
      })
      expect(hotlineEnabledSelector(state)).toBe(false)
    })
  })
  describe('when screenings feature is not active', () => {
    it('returns false if the hotline privilege is present', () => {
      spyOn(IntakeConfig, 'isFeatureActive').and.returnValue(false)
      const state = fromJS({
        userInfo: {
          privileges: ['Hotline-rollout'],
        },
      })
      expect(hotlineEnabledSelector(state)).toBe(false)
    })
    it('returns false if the hotline privilege is not present', () => {
      spyOn(IntakeConfig, 'isFeatureActive').and.returnValue(false)
      const state = fromJS({
        userInfo: {
          privileges: [],
        },
      })
      expect(hotlineEnabledSelector(state)).toBe(false)
    })
  })
})
