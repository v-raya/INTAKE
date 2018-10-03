import {createReducer} from 'utils/createReducer'
import {fromJS} from 'immutable'
import {
  TOGGLE_ADDRESS_SEARCH,
  PEOPLE_SEARCH_CLEAR,
  PEOPLE_SEARCH_FETCH,
  PEOPLE_SEARCH_FETCH_COMPLETE,
  RESET_ADDRESS_SEARCH,
  SET_SEARCH_TERM,
  SET_SEARCH_ADDRESS,
  SET_SEARCH_CITY,
  SET_SEARCH_COUNTY,
  LOAD_MORE_RESULTS_COMPLETE,
} from 'actions/peopleSearchActions'
import {FETCH_USER_INFO_COMPLETE} from 'actions/userInfoActions'
import moment from 'moment'

const initialState = fromJS({
  results: [],
  searchTerm: '',
  total: 0,
  isAddressIncluded: false,
  searchAddress: '',
  searchCity: '',
  searchCounty: '',
  defaultCounty: null,
})

const resetAddressSearch = (state) => state
  .set('searchCounty', state.get('defaultCounty') || '')
  .set('searchCity', '')
  .set('searchAddress', '')
  .set('isAddressIncluded', false)

export default createReducer(initialState, {
  [PEOPLE_SEARCH_FETCH](state, {payload: {searchTerm}}) {
    return state.set('searchTerm', searchTerm)
      .set('total', null)
  },
  [PEOPLE_SEARCH_FETCH_COMPLETE](state, {payload: {results, total}, error}) {
    if (error) {
      return state
    } else {
      return state.set('results', fromJS(results))
        .set('total', total)
    }
  },
  [PEOPLE_SEARCH_CLEAR](state, _action) {
    return state.set('results', fromJS([]))
      .set('startTime', null)
      .set('total', null)
  },
  [SET_SEARCH_TERM](state, {payload: {searchTerm}}) {
    if (state.get('startTime')) {
      return state.set('searchTerm', searchTerm)
    } else if (searchTerm) {
      return state.set('searchTerm', searchTerm)
        .set('startTime', moment().toISOString())
    } else {
      return state.set('searchTerm', searchTerm)
        .set('startTime', null)
    }
  },
  [SET_SEARCH_ADDRESS](state, {payload: {address}}) {
    return state.set('searchAddress', address)
  },
  [SET_SEARCH_CITY](state, {payload: {city}}) {
    return state.set('searchCity', city)
  },
  [SET_SEARCH_COUNTY](state, {payload: {county}}) {
    return state.set('searchCounty', county)
  },
  [FETCH_USER_INFO_COMPLETE](state, {payload: {userInfo: {county}}}) {
    if (county === 'State of California') { return state }
    const newState = state.set('defaultCounty', county)
    return newState.get('searchCounty') === '' ? newState.set('searchCounty', county) : newState
  },
  [LOAD_MORE_RESULTS_COMPLETE](state, {payload: {results}, error}) {
    if (error) {
      return state
    } else {
      return state.update('results', (arr) => arr.concat(fromJS(results)))
    }
  },
  [TOGGLE_ADDRESS_SEARCH](state) {
    return state.get('isAddressIncluded') ?
      resetAddressSearch(state) :
      state.set('isAddressIncluded', true)
  },
  [RESET_ADDRESS_SEARCH]: resetAddressSearch,
})
