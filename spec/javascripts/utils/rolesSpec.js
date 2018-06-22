import {List} from 'immutable'
import {
  ROLE_TYPE_REPORTER,
  ROLE_TYPE_NON_REPORTER,
} from 'enums/RoleType'
import {
  hasReporter,
  hasNonReporter,
} from 'utils/roles'

describe('Roles', () => {
  describe('hasReporter', () => {
    it('checks for the existence of any reporter roles', () => {
      ROLE_TYPE_REPORTER.forEach((role) => {
        expect(hasReporter([role])).toEqual(true)
      })
    })

    it('is false for all non-reporter roles', () => {
      ROLE_TYPE_NON_REPORTER.forEach((role) => {
        expect(hasReporter([role])).toEqual(false)
      })
    })

    it('finds a reporter role among several options', () => {
      const roles = ['Super Hero', ROLE_TYPE_REPORTER[0], 'Super Villain']
      expect(hasReporter(roles)).toEqual(true)
    })

    it('is false if all roles are non-reporter', () => {
      expect(hasReporter(ROLE_TYPE_NON_REPORTER)).toEqual(false)
    })

    it('is false unless the roles explicitly include a reporter role', () => {
      expect(hasReporter([])).toEqual(false)
    })

    it('works with Immutable lists', () => {
      expect(hasReporter(List(ROLE_TYPE_REPORTER))).toEqual(true)
    })
  })

  describe('hasNonReporter', () => {
    it('checks for the existence of any non-reporter role', () => {
      ROLE_TYPE_NON_REPORTER.forEach((role) => {
        expect(hasNonReporter([role])).toEqual(true)
      })
    })

    it('is false for all reporter roles', () => {
      ROLE_TYPE_REPORTER.forEach((role) => {
        expect(hasNonReporter([role])).toEqual(false)
      })
    })

    it('finds a non-reporter role among several options', () => {
      const roles = ['Super Hero', ROLE_TYPE_NON_REPORTER[0], 'Super Villain']
      expect(hasNonReporter(roles)).toEqual(true)
    })

    it('is false if all roles are reporter roles', () => {
      expect(hasNonReporter(ROLE_TYPE_REPORTER)).toEqual(false)
    })

    it('is false unless the roles explicitly include a non-reporter role', () => {
      expect(hasNonReporter([])).toEqual(false)
    })

    it('works with Immutable lists', () => {
      expect(hasNonReporter(List(ROLE_TYPE_NON_REPORTER))).toEqual(true)
    })
  })
})
