import * as matchers from 'jasmine-immutable-matchers'
import {
  checkStaffPermissionSuccess,
  checkStaffPermissionFailure,
} from 'actions/staffActions'
import staffReducer from 'reducers/staffReducer'
import {Map} from 'immutable'

describe('staffReducer', () => {
  beforeEach(() => jasmine.addMatchers(matchers))

  describe('on CHECK_STAFF_PERMISSION_COMPLETE', () => {
    it('returns true if the current staff has permission on success', () => {
      const hasPermission = true
      const action = checkStaffPermissionSuccess('mypermission', hasPermission)
      expect(staffReducer(Map(), action)).toEqualImmutable(
        Map({mypermission: true})
      )
    })

    it('returns the last state on failure', () => {
      const action = checkStaffPermissionFailure()
      expect(staffReducer(Map(), action)).toEqualImmutable(
        Map()
      )
    })

    it('can handle multiple different permissions checks', () => {
      const hasPermission = true
      const action = checkStaffPermissionSuccess('mypermission', hasPermission)
      const firstState = staffReducer(Map(), action)

      const anotherAction = checkStaffPermissionSuccess('anotherpermission', hasPermission)
      expect(staffReducer(firstState, anotherAction)).toEqualImmutable(
        Map({mypermission: true, anotherpermission: true})
      )
    })

    it('overrides the previous setting if it gets the same permission', () => {
      const hasPermission = true
      const action = checkStaffPermissionSuccess('mypermission', hasPermission)
      const firstState = staffReducer(Map(), action)

      const anotherAction = checkStaffPermissionSuccess('mypermission', false)
      expect(staffReducer(firstState, anotherAction)).toEqualImmutable(
        Map({mypermission: false})
      )
    })
  })
})
