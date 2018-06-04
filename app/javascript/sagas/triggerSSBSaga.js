import {List, Map} from 'immutable'
import {takeEvery, call, select, put} from 'redux-saga/effects'
import {createPersonSuccess} from 'actions/personCardActions'
import {saveSuccess} from 'actions/screeningActions'
import {babyDoe, parentDoe} from 'data/participants'
import {getScreeningSelector} from 'selectors/screeningSelectors'
import {post, put as putHTTP} from 'utils/http'

export function* triggerSSB({payload: screening_id}) {
  try {
    const baby = yield call(post, '/api/v1/participants', {
      participant: {
        screening_id,
        ...babyDoe,
      },
    })
    yield put(createPersonSuccess(baby))
    const caretaker = yield call(post, '/api/v1/participants', {
      participant: {
        screening_id,
        ...parentDoe,
      },
    })
    yield put(createPersonSuccess(caretaker))

    const screening = yield select(getScreeningSelector)
    const screeningWithAllegation = screening.set('allegations',
      screening.get('allegations', List()).push(Map({
        screening_id,
        victim_person_id: baby.id,
        perpetrator_person_id: caretaker.id,
        types: ['Caretaker absent/incapacity'],
      }))
    )

    const path = `/api/v1/screenings/${screening_id}`
    const response = yield call(putHTTP, path, {
      screening: screeningWithAllegation.toJS(),
    })
    yield put(saveSuccess(response))
  } catch (error) {
    console.log('Error')
  }
}

export function* triggerSSBSaga() {
  yield takeEvery('TRIGGER_SSB', triggerSSB)
}
