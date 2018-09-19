import {takeLatest, put, call, select} from 'redux-saga/effects'
import {get} from 'utils/http'
import {delay} from 'redux-saga'
import {logEvent} from 'utils/analytics'
import {fetchPeopleSearchSaga, fetchPeopleSearch, getPeopleEffect} from 'sagas/fetchPeopleSearchSaga'
import {PEOPLE_SEARCH_FETCH, search, fetchSuccess, fetchFailure} from 'actions/peopleSearchActions'
import {getStaffIdSelector} from 'selectors/userInfoSelectors'

describe('fetchPeopleSearchSaga', () => {
  it('fetches people search results on PEOPLE_SEARCH_FETCH', () => {
    const peopleSeachSagaGenerator = fetchPeopleSearchSaga()
    expect(peopleSeachSagaGenerator.next().value).toEqual(takeLatest(PEOPLE_SEARCH_FETCH, fetchPeopleSearch))
  })
})

describe('fetchPeopleSearch', () => {
  const action = search('hello', true)

  it('finds some error during the process', () => {
    const error = 'Something went wrong'
    const peopleSeachGenerator = fetchPeopleSearch(action)
    expect(peopleSeachGenerator.next().value).toEqual(call(delay, 400))
    expect(peopleSeachGenerator.next().value).toEqual(call(get, '/api/v1/people', {search_term: 'hello', is_client_only: true}))
    expect(peopleSeachGenerator.throw(error).value).toEqual(put(fetchFailure('Something went wrong')))
  })

  it('fetches people search results successfully', () => {
    const staff_id = '0x4'
    const searchResults = {
      hits: {
        total: 0,
        hits: [],
      },
    }
    const peopleSearchGenerator = fetchPeopleSearch(action)
    expect(peopleSearchGenerator.next().value).toEqual(call(delay, 400))
    expect(peopleSearchGenerator.next().value).toEqual(call(get, '/api/v1/people', {search_term: 'hello', is_client_only: true}))
    expect(peopleSearchGenerator.next(searchResults).value).toEqual(
      select(getStaffIdSelector)
    )
    expect(peopleSearchGenerator.next(staff_id).value).toEqual(put(fetchSuccess(searchResults)))
    expect(peopleSearchGenerator.next().value).toEqual(call(logEvent, 'personSearch', {
      staffId: staff_id,
      totalResults: searchResults.hits.total,
    }))
  })

  it('fetches people search results with address params', () => {
    const staff_id = '0x4'
    const searchResults = {
      hits: {
        total: 0,
        hits: [],
      },
    }
    const action = search('hello', true, {
      county: 'Tuolumne',
      city: 'Townville',
      address: '5 Chive Drive',
    })

    const peopleSearchGenerator = fetchPeopleSearch(action)
    expect(peopleSearchGenerator.next().value).toEqual(call(delay, 400))
    expect(peopleSearchGenerator.next().value).toEqual(call(get, '/api/v1/people', {
      search_term: 'hello',
      is_client_only: true,
      search_address: {
        county: 'Tuolumne',
        city: 'Townville',
        street: '5 Chive Drive',
      },
    }))
    expect(peopleSearchGenerator.next(searchResults).value).toEqual(
      select(getStaffIdSelector)
    )
    expect(peopleSearchGenerator.next(staff_id).value).toEqual(put(fetchSuccess(searchResults)))
    expect(peopleSearchGenerator.next().value).toEqual(call(logEvent, 'personSearch', {
      staffId: staff_id,
      totalResults: searchResults.hits.total,
    }))
  })
})

describe('getPeopleEffect', () => {
  it('is a call effect to the people search endpoint', () => {
    expect(getPeopleEffect({
      searchTerm: 'foo',
      isClientOnly: true,
    })).toEqual(call(get, '/api/v1/people', {
      search_term: 'foo',
      is_client_only: true,
    }))
  })
  it('includes address params when present', () => {
    expect(getPeopleEffect({
      searchTerm: 'buzz',
      isClientOnly: true,
      searchAddress: {
        address: 'Strawberry Fields',
        city: 'Farmville',
        county: 'Zynga',
      },
    })).toEqual(call(get, '/api/v1/people', {
      search_term: 'buzz',
      is_client_only: true,
      search_address: {
        street: 'Strawberry Fields',
        city: 'Farmville',
        county: 'Zynga',
      },
    }))
  })
  it('includes search_after param when present', () => {
    expect(getPeopleEffect({
      searchTerm: 'fizz',
      isClientOnly: false,
      sort: 'What even goes here?',
    })).toEqual(call(get, '/api/v1/people', {
      search_term: 'fizz',
      is_client_only: false,
      search_after: 'What even goes here?',
    }))
  })
})
