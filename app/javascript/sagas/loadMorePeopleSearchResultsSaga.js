import {takeEvery, put, select} from 'redux-saga/effects'
import {getPeopleEffect} from 'sagas/fetchPeopleSearchSaga'
import {
  selectSearchTermValue,
  selectLastResultsSortValue,
} from 'selectors/peopleSearchSelectors'
import {
  LOAD_MORE_RESULTS,
  loadMoreResultsSuccess,
  loadMoreResultsFailure,
} from 'actions/peopleSearchActions'

export function* loadMorePeopleSearch({payload: {isClientOnly, searchAddress}}) {
  try {
    const searchTerm = yield select(selectSearchTermValue)
    const sort = yield select(selectLastResultsSortValue)
    const response = yield getPeopleEffect({searchTerm, isClientOnly, searchAddress, sort})
    yield put(loadMoreResultsSuccess(response))
  } catch (error) {
    yield put(loadMoreResultsFailure(error))
  }
}

export function* loadMorePeopleSearchResultsSaga() {
  yield takeEvery(LOAD_MORE_RESULTS, loadMorePeopleSearch)
}
