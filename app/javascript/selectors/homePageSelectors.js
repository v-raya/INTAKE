import {List} from 'immutable'
import {createSelector} from 'reselect'
import {userPrivilegesSelector} from 'selectors/userInfoSelectors'
import {isFeatureActive} from 'common/config'

export const screeningsListSelector = (state) => state.get('screenings') || List()

export const snapshotEnabledSelector = createSelector(
  userPrivilegesSelector,
  (privileges) => privileges.includes('Snapshot-rollout') && isFeatureActive('snapshot')
)

export const hotlineEnabledSelector = createSelector(
  userPrivilegesSelector,
  (privileges) => privileges.includes('Hotline-rollout') && isFeatureActive('screenings')
)
