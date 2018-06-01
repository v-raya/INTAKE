import {takeEvery, call, select} from 'redux-saga/effects'
import {babyDoe, parentDoe} from 'data/participants'
import {getScreeningSelector} from 'selectors/screeningSelectors'
import {post} from 'utils/http'

export function* triggerSSB({payload: screening_id}) {
  try {
    yield call(post, '/api/v1/participants', {
      participant: {
        screening_id,
        ...babyDoe,
      },
    })
    yield call(post, '/api/v1/participants', {
      participant: {
        screening_id,
        ...parentDoe,
      },
    })

    yield select(getScreeningSelector)
  } catch (error) {
    console.log('Error')
  }
}

export function* triggerSSBSaga() {
  yield takeEvery('TRIGGER_SSB', triggerSSB)
}
