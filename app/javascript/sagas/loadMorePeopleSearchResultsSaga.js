import {takeEvery, put, call, select} from 'redux-saga/effects'
import {
  selectSearchTermValue,
  selectLastResultsSortValue,
} from 'selectors/peopleSearchSelectors'
import {get} from 'utils/http'
import {
  LOAD_MORE_RESULTS,
  loadMoreResultsSuccess,
  loadMoreResultsFailure,
} from 'actions/peopleSearchActions'

const addressParams = (searchAddress) => {
  const params = {}
  if (!searchAddress) { return {} }

  if (searchAddress.county) {
    params.search_county = searchAddress.county
  }
  if (searchAddress.city) {
    params.search_city = searchAddress.city
  }
  if (searchAddress.address) {
    params.search_address = searchAddress.address
  }
  return params
}

export function* loadMorePeopleSearch({payload: {isClientOnly, searchAddress}}) {
  try {
    const searchTerm = yield select(selectSearchTermValue)
    const sort = yield select(selectLastResultsSortValue)
    const response = yield call(
      get,
      '/api/v1/people',
      {
        search_term: searchTerm,
        search_after: sort,
        is_client_only: isClientOnly,
        ...addressParams(searchAddress),
      }
    )
    yield put(loadMoreResultsSuccess(response))
  } catch (error) {
    yield put(loadMoreResultsFailure(error))
  }
}

export function* loadMorePeopleSearchResultsSaga() {
  yield takeEvery(LOAD_MORE_RESULTS, loadMorePeopleSearch)
}
