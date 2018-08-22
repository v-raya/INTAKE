import {call, select, put, takeEvery} from 'redux-saga/effects'
import {fetchRelationships} from 'actions/relationshipsActions'
import {getScreeningIdValueSelector} from 'selectors/screeningSelectors'
import {selectClientIds} from 'selectors/participantSelectors'
import {selectRelationship} from 'selectors/screening/relationshipFormSelectors'
import {UPDATE_RELATIONSHIP} from 'actions/actionTypes'
import {
  updateRelationshipFailure,
  updateRelationshipSuccess,
} from 'actions/relationshipActions'

import * as Utils from 'utils/http'

export function* saveRelationship({payload: {id}}) {
  try {
    const relationship = yield select(selectRelationship)
    if (!relationship.get('reversed')) {
      const updateRelationship = relationship.toJS()
      const response = yield call(Utils.put, `/api/v1/relationships/${id}`, updateRelationship)
      yield put(updateRelationshipSuccess(response))
      const screeningId = yield select(getScreeningIdValueSelector)
      const clientIds = yield select(selectClientIds)
      yield put(fetchRelationships(clientIds, screeningId))
    }
  } catch (error) {
    yield put(updateRelationshipFailure(error))
  }
}

export function* saveRelationshipSaga() {
  yield takeEvery(UPDATE_RELATIONSHIP, saveRelationship)
}
