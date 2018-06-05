import {takeEvery, call, put} from 'redux-saga/effects'
import {setAllegationTypes} from 'actions/allegationsFormActions'
import {createPersonSuccess} from 'actions/personCardActions'
import {saveCard} from 'actions/screeningActions'
import {cardName as allegationsCardName} from 'containers/screenings/AllegationsFormContainer'
import {babyDoe, parentDoe} from 'data/participants'
import {post} from 'utils/http'

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

    yield put(setAllegationTypes({
      victimId: baby.id,
      perpetratorId: caretaker.id,
      allegationTypes: ['Caretaker absent/incapacity'],
    }))
    yield put(saveCard(allegationsCardName))
  } catch (error) {
    yield put()
  }
}

export function* triggerSSBSaga() {
  yield takeEvery('TRIGGER_SSB', triggerSSB)
}
