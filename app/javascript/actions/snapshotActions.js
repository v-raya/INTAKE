import {
  CREATE_SNAPSHOT,
  CLEAR_SNAPSHOT,
} from 'actions/actionTypes'

export function createSnapshot() {
  return {type: CREATE_SNAPSHOT}
}
export function clearSnapshot() {
  return {type: CLEAR_SNAPSHOT}
}
