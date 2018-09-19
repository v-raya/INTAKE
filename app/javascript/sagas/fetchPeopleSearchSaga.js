import {takeLatest, put, call, select} from 'redux-saga/effects'
import {delay} from 'redux-saga'
import {get} from 'utils/http'
import {logEvent} from 'utils/analytics'
import {PEOPLE_SEARCH_FETCH, fetchSuccess, fetchFailure} from 'actions/peopleSearchActions'
import {getStaffIdSelector} from 'selectors/userInfoSelectors'

const addressParams = (searchAddress) => {
  const params = {}
  if (!searchAddress) { return {} }

  if (searchAddress.county) {
    params.county = searchAddress.county
  }
  if (searchAddress.city) {
    params.city = searchAddress.city
  }
  if (searchAddress.address) {
    params.street = searchAddress.address
  }
  return {search_address: params}
}

export function* fetchPeopleSearch({payload: {searchTerm, isClientOnly, searchAddress}}) {
  try {
    const TIME_TO_DEBOUNCE = 400
    yield call(delay, TIME_TO_DEBOUNCE)
    const response = yield call(get, '/api/v1/people', {
      search_term: searchTerm,
      is_client_only: isClientOnly,
      ...addressParams(searchAddress),
    })
    const staffId = yield select(getStaffIdSelector)
    yield put(fetchSuccess(response))
    yield call(logEvent, 'personSearch', {
      staffId: staffId,
      totalResults: response.hits.total,
    })
  } catch (error) {
    yield put(fetchFailure(error))
  }
}

export function* fetchPeopleSearchSaga() {
  yield takeLatest(PEOPLE_SEARCH_FETCH, fetchPeopleSearch)
}
