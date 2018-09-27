import * as matchers from 'jasmine-immutable-matchers'
import {
  clear,
  fetchFailure,
  fetchSuccess,
  toggleAddressSearch,
  resetAddressSearch,
  search,
  setSearchTerm,
  setSearchAddress,
  setSearchCity,
  setSearchCounty,
  loadMoreResultsSuccess,
  loadMoreResultsFailure,
} from 'actions/peopleSearchActions'
import {fetchSuccess as fetchUserInfoSuccess} from 'actions/userInfoActions'
import peopleSearchReducer from 'reducers/peopleSearchReducer'
import {Map, fromJS} from 'immutable'
import moment from 'moment'

describe('peopleSearchReducer', () => {
  beforeEach(() => jasmine.addMatchers(matchers))
  describe('on PEOPLE_SEARCH_FETCH', () => {
    it('updates the search term and total', () => {
      const action = search('newSearchTerm')
      expect(peopleSearchReducer(Map(), action)).toEqualImmutable(
        fromJS({
          searchTerm: 'newSearchTerm',
          total: null,
        })
      )
    })
  })
  describe('on PEOPLE_SEARCH_FETCH_COMPLETE', () => {
    const initialState = fromJS({
      searchTerm: 'newSearchTerm',
      total: 0,
    })
    describe('on success', () => {
      const action = fetchSuccess({
        hits: {
          total: 2,
          hits: ['result_one', 'result_two'],
        },
      })
      it('updates search results with hits and sets the new total', () => {
        expect(peopleSearchReducer(initialState, action)).toEqualImmutable(
          fromJS({
            searchTerm: 'newSearchTerm',
            total: 2,
            results: ['result_one', 'result_two'],
          })
        )
      })
    })
    describe('on failure', () => {
      const action = fetchFailure()
      it('leaves state unchanged', () => {
        expect(peopleSearchReducer(initialState, action)).toEqualImmutable(initialState)
      })
    })
  })
  describe('on PEOPLE_SEARCH_CLEAR', () => {
    const initialState = fromJS({
      searchTerm: 'newSearchTerm',
      total: 3,
      results: ['result_one', 'result_two', 'result_three'],
    })
    const action = clear()
    it('resets results, total, and startTime', () => {
      expect(peopleSearchReducer(initialState, action)).toEqualImmutable(
        fromJS({
          searchTerm: 'newSearchTerm',
          total: null,
          results: [],
          startTime: null,
        })
      )
    })
  })
  describe('on SET_SEARCH_TERM', () => {
    it('resets results, total and sets startTime', () => {
      const action = setSearchTerm('something')
      const initialState = fromJS({
        searchTerm: 'newSearchTerm',
        total: 3,
        results: ['result_one', 'result_two', 'result_three'],
      })
      const today = moment('2015-10-19').toDate()
      jasmine.clock().mockDate(today)
      expect(peopleSearchReducer(initialState, action)).toEqualImmutable(
        fromJS({
          searchTerm: 'something',
          total: 3,
          results: ['result_one', 'result_two', 'result_three'],
          startTime: today.toISOString(),
        })
      )
      jasmine.clock().uninstall()
    })

    it('resets the start time when there is no search term', () => {
      const action = setSearchTerm('')
      const initialState = fromJS({
        searchTerm: '',
        total: 0,
        results: [],
      })
      expect(peopleSearchReducer(initialState, action)).toEqualImmutable(
        fromJS({
          searchTerm: '',
          total: 0,
          results: [],
          startTime: null,
        })
      )
    })
  })
  describe('on SET_SEARCH_ADDRESS', () => {
    it('sets the address', () => {
      const action = setSearchAddress('Goodbye')
      const initialState = fromJS({
        searchTerm: 'searchTerm',
        total: 3,
        results: ['result_one', 'result_two', 'result_three'],
        searchAddress: 'Hello',
      })
      expect(
        peopleSearchReducer(initialState, action).get('searchAddress')
      ).toEqual('Goodbye')
    })
  })
  describe('on SET_SEARCH_CITY', () => {
    it('sets the city', () => {
      const action = setSearchCity('Sac Town')
      const initialState = fromJS({
        searchTerm: 'searchTerm',
        total: 3,
        results: ['result_one', 'result_two', 'result_three'],
        searchCity: 'Sac Town',
      })
      expect(
        peopleSearchReducer(initialState, action).get('searchCity')
      ).toEqual('Sac Town')
    })
  })
  describe('on SET_SEARCH_COUNTY', () => {
    it('sets the county', () => {
      const action = setSearchCounty('Placer')
      const initialState = fromJS({
        searchTerm: 'searchTerm',
        total: 3,
        results: ['result_one', 'result_two', 'result_three'],
        searchCounty: 'Shasta',
      })
      expect(
        peopleSearchReducer(initialState, action).get('searchCounty')
      ).toEqual('Placer')
    })
  })
  describe('on LOAD_MORE_RESULTS_COMPLETE', () => {
    const initialState = fromJS({
      searchTerm: 'newSearchTerm',
      total: 4,
      results: ['result_one', 'result_two'],
    })
    describe('on success', () => {
      const action = loadMoreResultsSuccess({
        hits: {
          hits: ['result_three', 'result_four'],
        },
      })
      it('updates search results with hits', () => {
        expect(peopleSearchReducer(initialState, action)).toEqualImmutable(
          fromJS({
            searchTerm: 'newSearchTerm',
            total: 4,
            results: [
              'result_one', 'result_two', 'result_three', 'result_four',
            ],
          })
        )
      })
    })
    describe('on failure', () => {
      const action = loadMoreResultsFailure()
      it('leaves state unchanged', () => {
        expect(peopleSearchReducer(initialState, action)).toEqualImmutable(initialState)
      })
    })
  })

  describe('on TOGGLE_ADDRESS_SEARCH', () => {
    const action = toggleAddressSearch()
    it('toggle isAddressIncluded flag from false to true', () => {
      const initialState = fromJS({isAddressIncluded: false})
      expect(peopleSearchReducer(initialState, action)).toEqualImmutable(
        fromJS({
          isAddressIncluded: true,
        })
      )
    })
    it('toggle isAddressIncluded flag from true to false', () => {
      const initialState = fromJS({isAddressIncluded: true})
      expect(peopleSearchReducer(initialState, action)).toEqualImmutable(
        fromJS({
          isAddressIncluded: false,
        })
      )
    })
  })

  describe('on FETCH_USER_INFO_COMPLETE', () => {
    it('defaults the search county to the county of the user', () => {
      const action = fetchUserInfoSuccess({county: 'Los Angeles'})
      const initialState = fromJS({searchCounty: ''})
      const newState = peopleSearchReducer(initialState, action)
      expect(newState.get('searchCounty')).toEqual('Los Angeles')
      expect(newState.get('defaultCounty')).toEqual('Los Angeles')
    })
    it('does not override an explicit user selection', () => {
      const action = fetchUserInfoSuccess({county: 'Los Angeles'})
      const initialState = fromJS({searchCounty: 'Sutter'})
      const newState = peopleSearchReducer(initialState, action)
      expect(newState.get('searchCounty')).toEqual('Sutter')
      expect(newState.get('defaultCounty')).toEqual('Los Angeles')
    })
  })

  describe('on RESET_ADDRESS_SEARCH', () => {
    it('clears everything and sets county to default', () => {
      const action = resetAddressSearch()
      const initialState = fromJS({
        searchCounty: 'Yolo',
        searchCity: 'Davis',
        searchAddress: '123 Main St',
        isAddressIncluded: true,
        defaultCounty: 'Sacramento',
      })
      const newState = peopleSearchReducer(initialState, action)
      expect(newState).toEqualImmutable(fromJS({
        searchCounty: 'Sacramento',
        searchCity: '',
        searchAddress: '',
        isAddressIncluded: false,
        defaultCounty: 'Sacramento',
      }))
    })
  })
})
