import Autocompleter from 'common/Autocompleter'
import React from 'react'
import {shallow, mount} from 'enzyme'
import * as Analytics from 'utils/analytics'

describe('<Autocompleter />', () => {
  function mountAutocompleter({
    canCreateNewPerson,
    onLoadMoreResults = () => null,
    isSelectable = () => true,
    onChange = () => null,
    onClear = () => null,
    onSearch = () => null,
    onSelect = () => null,
    results = [],
    searchTerm = '',
    total = 0,
  }) {
    return mount(
      <Autocompleter
        canCreateNewPerson={canCreateNewPerson}
        onLoadMoreResults={onLoadMoreResults}
        onSelect={onSelect}
        onClear={onClear}
        onChange={onChange}
        isSelectable={isSelectable}
        total={total}
        results={results}
        searchTerm={searchTerm}
        onSearch={onSearch}
      />
    )
  }
  function renderAutocompleter({
    onSelect = () => null,
    onLoadMoreResults = () => null,
    onClear = () => null,
    isSelectable = () => true,
    onSearch = () => null,
    onChange = () => null,
    searchTerm = '',
    results = [],
    total = 0,
    id = null,
  }) {
    return shallow(
      <Autocompleter
        id={id}
        onSelect={onSelect}
        onLoadMoreResults={onLoadMoreResults}
        onClear={onClear}
        onChange={onChange}
        isSelectable={isSelectable}
        total={total}
        results={results}
        searchTerm={searchTerm}
        onSearch={onSearch}
      />, {disableLifecycleMethods: true}
    )
  }

  beforeEach(() => {
    spyOn(Analytics, 'logEvent')
  })

  describe('#onItemSelect', () => {
    let onLoadMoreResults
    let onClear
    let onChange
    let onSelect
    const results = [
      {legacyDescriptor: {legacy_id: 1}},
      {legacyDescriptor: {legacy_id: 2}},
      {legacyDescriptor: {legacy_id: 3}},
      {showMoreResults: 'Show More Results'},
      {createNewPerson: 'Create New Person'},
    ]
    const item = results[0]
    beforeEach(() => {
      onClear = jasmine.createSpy('onClear')
      onChange = jasmine.createSpy('onChange')
      onSelect = jasmine.createSpy('onSelect')
      onLoadMoreResults = jasmine.createSpy('onLoadMoreResults')
    })

    describe('when an item is selectable', () => {
      let autocompleter
      beforeEach(() => {
        autocompleter = mountAutocompleter({
          results, onClear, onChange, onSelect,
        })
        autocompleter.find('input').simulate('change', {target: {value: 'te'}})
        autocompleter.find('div[id="search-result-1"]')
          .first()
          .simulate('click', null)
      })

      it('clears the results', () => {
        expect(onClear).toHaveBeenCalled()
      })

      it('clears the search field', () => {
        expect(onChange).toHaveBeenCalledWith('')
      })

      it('calls onSelect with the selected result', () => {
        expect(onSelect).toHaveBeenCalledWith(item)
      })

      it('hides the menu', () => {
        const header = autocompleter.find('SuggestionHeader')
        expect(header.length).toBe(0)
      })

      it('logs a search result event', () => {
        expect(Analytics.logEvent)
          .toHaveBeenCalledWith('searchResultClick', {
            searchIndex: 0,
          })
      })
    })

    describe('when an item is selectable and is create new person', () => {
      let autocompleter
      beforeEach(() => {
        autocompleter = mountAutocompleter({
          results, onClear, onChange, onSelect,
        })
        autocompleter.find('input').simulate('change', {target: {value: 'te'}})
        autocompleter.find('div[id="create-new-results"]')
          .first()
          .simulate('click', null)
      })

      it('clears the results', () => {
        expect(onClear).toHaveBeenCalled()
      })

      it('clears the search field', () => {
        expect(onChange).toHaveBeenCalledWith('')
      })

      it('calls onSelect with the selected result', () => {
        expect(onSelect).toHaveBeenCalled()
      })

      it('hides the menu', () => {
        const header = autocompleter.find('SuggestionHeader')
        expect(header.length).toBe(0)
      })
    })

    describe('when an item is selectable and is show more results', () => {
      let autocompleter
      beforeEach(() => {
        autocompleter = mountAutocompleter({
          results, onClear, onChange, onSelect, onLoadMoreResults,
        })
        autocompleter.find('input').simulate('change', {target: {value: 'te'}})
        autocompleter.find('div[id="show-more-results"]')
          .first()
          .simulate('click', null)
      })

      it('calls loadMoreResults', () => {
        expect(onLoadMoreResults).toHaveBeenCalled()
      })
    })

    it('logs a search result event when a deeper item is clicked', () => {
      const autocompleter = mountAutocompleter({
        results, onClear, onChange, onSelect,
      })
      autocompleter.find('input').simulate('change', {target: {value: 'te'}})
      autocompleter.find('div[id="search-result-3"]')
        .first()
        .simulate('click', null)

      expect(Analytics.logEvent)
        .toHaveBeenCalledWith('searchResultClick', {
          searchIndex: 2,
        })
    })

    describe('when an item is not selectable', () => {
      beforeEach(() => {
        spyOn(window, 'alert')
        const isSelectable = jasmine.createSpy('isSelectable').and.returnValue(false)
        const autocompleter = mountAutocompleter({
          results, onClear, onChange, onSelect, isSelectable,
        })
        autocompleter.find('input').simulate('change', {target: {value: 'te'}})
        autocompleter.find('div[id="search-result-1"]')
          .first()
          .simulate('click', null)
      })

      it('only presents error message', () => {
        expect(onClear).not.toHaveBeenCalled()
        expect(onChange).not.toHaveBeenCalledWith('')
        expect(onSelect).not.toHaveBeenCalled()
        expect(window.alert).toHaveBeenCalledWith('You are not authorized to add this person.')
      })
    })
  })

  describe('onChangeInput', () => {
    let searchInput
    let onSearch
    let onChange
    beforeEach(() => {
      onSearch = jasmine.createSpy('onSearch')
      onChange = jasmine.createSpy('onChange')
      searchInput = renderAutocompleter({onSearch, onChange})
        .dive()
        .find('input')
    })
    describe('when user types two non whitespace characters', () => {
      const value = 'aa'
      beforeEach(() => searchInput.simulate('change', {target: {value}}))

      it('performs a search', () => {
        expect(onSearch).toHaveBeenCalledWith(value)
      })

      it('calls props onChange', () => {
        expect(onChange).toHaveBeenCalledWith(value)
      })
    })
    describe('when search value contains a character then a whitespace', () => {
      const value = 'a '
      beforeEach(() => searchInput.simulate('change', {target: {value}}))

      it('performs a search', () => {
        expect(onSearch).toHaveBeenCalledWith(value)
      })

      it('calls props onChange', () => {
        expect(onChange).toHaveBeenCalledWith(value)
      })
    })
    describe('when search value contains two whitespace characters', () => {
      const value = '  '
      beforeEach(() => searchInput.simulate('change', {target: {value}}))

      it('does not perform a search', () => {
        expect(onSearch).not.toHaveBeenCalled()
      })

      it('calls props onChange', () => {
        expect(onChange).toHaveBeenCalledWith(value)
      })
    })
    describe('when search value contains a whitespace then a character', () => {
      const value = ' a'
      beforeEach(() => searchInput.simulate('change', {target: {value}}))

      it('does not perform a search', () => {
        expect(onSearch).not.toHaveBeenCalled()
      })

      it('calls props onChange', () => {
        expect(onChange).toHaveBeenCalledWith(value)
      })
    })
  })

  describe('render', () => {
    it('displays an Autocomplete component', () => {
      const autocomplete = renderAutocompleter({
        id: 'search-input-id',
      }).find('Autocomplete')
      expect(autocomplete.length).toBe(1)

      const input = autocomplete.dive().find('input')
      expect(input.props().id).toEqual('search-input-id')
    })

    it('hides search results when search is less than two characters', () => {
      const results = Array.from(Array(5).keys())
        .map((id) => ({legacyDescriptor: {legacy_id: id}}))
      const autocomplete = mountAutocompleter({results}).find('Autocomplete')
      autocomplete.find('input')
        .simulate('change', {target: {value: 'a'}})
      expect(autocomplete.find('PersonSuggestion').length).toEqual(0)
    })

    describe('with search results present', () => {
      const address = {id: 'test address'}
      const ethnicity = {id: 'test ethnicity'}
      const languages = ['test languages']
      const phoneNumber = {id: 'test phone number'}
      const races = ['test race']
      const legacyDescriptor = {legacy_id: 'some-legacy-id'}
      const results = [{
        address,
        dateOfBirth: 'test date of birth',
        isDeceased: false,
        ethnicity,
        fullName: 'test full name',
        gender: 'male',
        isSealed: false,
        isSensitive: false,
        languages,
        legacyDescriptor,
        phoneNumber,
        races,
        ssn: 'test ssn',
      }, {
        legacyDescriptor: {legacy_id: 'some-other-legacy-id'},
      }]
      let autocompleter
      beforeEach(() => {
        autocompleter = mountAutocompleter({results})
        autocompleter.find('input')
          .simulate('change', {target: {value: 'ab'}})
      })

      it('displays multiple suggestions', () => {
        const suggestions = autocompleter.find('PersonSuggestion')
        expect(suggestions.length).toEqual(2)
      })

      it('scrolls when there are many results', () => {
        const menu = autocompleter.find('.autocomplete-menu')
        const menuStyle = menu.prop('style')
        expect(menuStyle.maxHeight).toEqual(jasmine.any(String))
        expect(menuStyle.overflowY).toBe('scroll')
        expect(menuStyle.overflowX).not.toBe('scroll') // No need to horizontally scroll
      })

      it('displays person suggestion', () => {
        const suggestions = autocompleter.find('PersonSuggestion')
        const suggestion = suggestions.at(0)

        expect(suggestion.props().address).toEqual(address)
        expect(suggestion.props().dateOfBirth).toEqual('test date of birth')
        expect(suggestion.props().isDeceased).toEqual(false)
        expect(suggestion.props().ethnicity).toEqual(ethnicity)
        expect(suggestion.props().fullName).toEqual('test full name')
        expect(suggestion.props().gender).toEqual('male')
        expect(suggestion.props().isSealed).toEqual(false)
        expect(suggestion.props().isSensitive).toEqual(false)
        expect(suggestion.props().languages).toEqual(languages)
        expect(suggestion.props().legacyDescriptor).toEqual(legacyDescriptor)
        expect(suggestion.props().phoneNumber).toEqual(phoneNumber)
        expect(suggestion.props().races).toEqual(races)
        expect(suggestion.props().ssn).toEqual('test ssn')
      })

      it('changes background colour when highlighted', () => {
        const input = autocompleter.find('input')
        input.simulate('keyDown', {key: 'ArrowDown', keyCode: 40, which: 40})
        const result = autocompleter.find('div[id="search-result-some-legacy-id"]')
        expect(result.props().style.backgroundColor).toEqual('#d4d4d4')
      })
    })

    it('displays no results were found', () => {
      const autocompleter = mountAutocompleter({total: 0, searchTerm: 'Simpson'})
      autocompleter.find('input')
        .simulate('change', {target: {value: 'ab'}})
      const suggestionHeader = autocompleter.find('SuggestionHeader')
      expect(suggestionHeader.html()).toContain('No results were found for "Simpson"')
    })

    it('displays number of results found', () => {
      const fiveResults = Array.from(Array(5).keys()).map((id) => ({legacyDescriptor: {legacy_id: id}}))
      const autocompleter = mountAutocompleter({
        results: fiveResults,
        total: 10,
        searchTerm: 'Simpson',
      })
      autocompleter.find('input')
        .simulate('change', {target: {value: 'ab'}})
      const suggestionHeader = autocompleter.find('SuggestionHeader')
      expect(suggestionHeader.html()).toContain('Showing 1-5 of 10 results for "Simpson"')
    })
  })
})
