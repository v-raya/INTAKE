import {takeEvery, call, put, select} from 'redux-saga/effects'
import {setAllegationTypes} from 'actions/allegationsFormActions'
import {
  createPersonFailure,
  createPersonSuccess,
} from 'actions/personCardActions'
import {GENERATE_BABY_DOE} from 'actions/safelySurrenderedBabyActions'
import {
  saveCard,
  saveFailure,
  saveSuccess,
} from 'actions/screeningActions'
import {cardName as allegationsCardName} from 'containers/screenings/AllegationsFormContainer'
import {babyDoe, caretakerDoe} from 'data/participants'
import {
  getScreeningWithEditsSelector as getScreeningWithScreeningInformationEditsSelector,
} from 'selectors/screening/screeningInformationFormSelectors'
import * as http from 'utils/http'

export function* generateBabyDoe({payload: screening_id}) {
  try {
    const screening = yield select(getScreeningWithScreeningInformationEditsSelector)
    const id = screening.get('id')
    const path = `/api/v1/screenings/${id}`
    const response = yield call(http.put, path, {screening: screening.toJS()})
    yield put(saveSuccess(response))
  } catch (error) {
    yield put(saveFailure(error && error.responseJSON))
  }

  try {
    const baby = yield call(http.post, '/api/v1/participants', {
      participant: {
        screening_id,
        ...babyDoe,
      },
    })
    yield put(createPersonSuccess(baby))
    const caretaker = yield call(http.post, '/api/v1/participants', {
      participant: {
        screening_id,
        ...caretakerDoe,
      },
    })
    yield put(createPersonSuccess(caretaker))

    yield put.resolve(setAllegationTypes({
      victimId: baby.id,
      perpetratorId: caretaker.id,
      allegationTypes: ['Caretaker absent/incapacity'],
    }))
    yield put(saveCard(allegationsCardName))
  } catch (error) {
    yield put(createPersonFailure(error && error.responseJSON))
  }
}

export function* generateBabyDoeSaga() {
  yield takeEvery(GENERATE_BABY_DOE, generateBabyDoe)
}
