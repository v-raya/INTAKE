import {takeEvery, put, call, select} from 'redux-saga/effects'
import * as api from 'utils/http'
import {saveSuccess, saveFailure, saveFailureFromNoParticipants, SAVE_SCREENING, createScreeningSuccess, createScreeningFailure} from 'actions/screeningActions'
import {getScreeningWithAllegationsEditsSelector} from 'selectors/screening/allegationsFormSelectors'
import {
  getScreeningWithEditsSelector as getScreeningWithScreeningInformationEditsSelector,
} from 'selectors/screening/screeningInformationFormSelectors'
import {
  getScreeningWithEditsSelector as getScreeningWithNarrativeEditsSelector,
} from 'selectors/screening/narrativeFormSelectors'
import {
  getScreeningWithEditsSelector as getScreeningWithIncidentInformationEditsSelector,
} from 'selectors/screening/incidentInformationFormSelector'
import {
  getScreeningWithEditsSelector as getScreeningWithWorkerSafetyEditsSelector,
} from 'selectors/screening/workerSafetyFormSelectors'
import {
  getScreeningWithEditsSelector as getScreeningWithCrossReportEditsSelector,
} from 'selectors/screening/crossReportFormSelectors'
import {
  getScreeningWithEditsSelector as getScreeningWithDecisionEditsSelector,
} from 'selectors/screening/decisionFormSelectors'
import {cardName as allegationsCardName} from 'containers/screenings/AllegationsFormContainer'
import {cardName as screeningInformationCardName} from 'containers/screenings/ScreeningInformationFormContainer'
import {cardName as incidentInformationCardName} from 'containers/screenings/IncidentInformationFormContainer'
import {cardName as narrativeCardName} from 'containers/screenings/NarrativeFormContainer'
import {cardName as decisionCardName} from 'containers/screenings/DecisionFormContainer'
import {cardName as workerSafetyCardName} from 'containers/screenings/WorkerSafetyFormContainer'
import {cardName as crossReportsCardName} from 'containers/screenings/CrossReportFormContainer'
import {replace} from 'react-router-redux'

export function* createScreeningBase(screening) {
  try {
    const response = yield call(api.post, '/api/v1/screenings', {screening: screening.toJS()})
    const {id} = response
    const screeningEditPath = `/screenings/${id}/edit`
    yield put(createScreeningSuccess(response))
    yield put(saveSuccess(response))
    yield put(replace(screeningEditPath))
  } catch (error) {
    yield put(saveFailure(error))
  }
}

function* quietlySaveScreeningCard({payload: {card}}) {
  try {
    let screening
    switch (card) {
      case allegationsCardName: {
        screening = yield select(getScreeningWithAllegationsEditsSelector)
        break
      }
      case crossReportsCardName: {
        screening = yield select(getScreeningWithCrossReportEditsSelector)
        break
      }
      case decisionCardName: {
        screening = yield select(getScreeningWithDecisionEditsSelector)
        break
      }
      case incidentInformationCardName: {
        screening = yield select(getScreeningWithIncidentInformationEditsSelector)
        break
      }
      case narrativeCardName: {
        screening = yield select(getScreeningWithNarrativeEditsSelector)
        break
      }
      case screeningInformationCardName: {
        screening = yield select(getScreeningWithScreeningInformationEditsSelector)
        break
      }
      case workerSafetyCardName: {
        screening = yield select(getScreeningWithWorkerSafetyEditsSelector)
        break
      }
    }

    if (screening.get('participants') === undefined) {
      yield put(saveFailureFromNoParticipants())
      return
    }
    const id = screening.get('id')
    if (id) {
      const path = `/api/v1/screenings/${id}`
      const response = yield call(api.put, path, {screening: screening.toJS()})
      yield put(saveSuccess(response))
    } else {
      yield* createScreeningBase(screening)
    }
  } catch (error) {
    yield put(saveFailure(error))
  }
}

export function* saveScreeningCard(action) {
  try {
    yield* quietlySaveScreeningCard(action)
  } catch (error) {
    yield put(saveFailure(error))
  }
}

export function* saveScreeningCardSaga() {
  yield takeEvery(SAVE_SCREENING, saveScreeningCard)
}
