import PersonSuggestion from 'common/PersonSuggestion'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import Autocomplete from 'react-autocomplete'
import SuggestionHeader from 'common/SuggestionHeader'
import CreateUnknownPerson from 'screenings/CreateUnknownPerson'
import ShowMoreResults from 'common/ShowMoreResults'
import {logEvent} from 'utils/analytics'
import moment from 'moment'
import SearchByAddress from 'common/SearchByAddress'

const MIN_SEARCHABLE_CHARS = 2

const addPosAndSetAttr = (results) => {
  const one = 1
  for (let len = results.length, i = 0; i < len; ++i) {
    results[i].posInSet = i + one
    results[i].setSize = len
  }
}

const itemClassName = (isHighlighted) => `search-item${isHighlighted ? ' highlighted-search-item' : ''}`

export default class Autocompleter extends Component {
  constructor(props) {
    super(props)
    this.state = {menuVisible: false}
    this.onFocus = this.onFocus.bind(this)
    this.hideMenu = this.hideMenu.bind(this)
    this.onItemSelect = this.onItemSelect.bind(this)
    this.renderMenu = this.renderMenu.bind(this)
    this.onChangeInput = this.onChangeInput.bind(this)
    this.renderItem = this.renderItem.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleToggleAddressSearch = this.handleToggleAddressSearch.bind(this)
  }

  constructAddress() {
    const {searchAddress, searchCity, searchCounty} = this.props
    return {
      address: searchAddress,
      city: searchCity,
      county: searchCounty,
    }
  }

  searchAndFocus(...searchArgs) {
    this.props.onSearch(...searchArgs)
    this.setState({menuVisible: true})
    if (this.inputRef) { this.inputRef.focus() }
  }

  handleSubmit() {
    const {onClear, searchTerm} = this.props
    onClear()
    this.searchAndFocus(searchTerm, this.constructAddress())
  }

  handleToggleAddressSearch(event) {
    const {onClear, searchTerm, onToggleAddressSearch} = this.props

    onClear()
    if (!event.target.checked && this.isSearchable(this.props.searchTerm)) { this.searchAndFocus(searchTerm) }
    onToggleAddressSearch(event)
  }

  isSearchable(value) {
    return value && value.replace(/^\s+/, '').length >= MIN_SEARCHABLE_CHARS
  }

  hideMenu() {
    if (this.inputRef) { this.inputRef.setAttribute('aria-activedescendant', '') }
    this.setState({menuVisible: false})
  }

  loadMoreResults() {
    const {isAddressIncluded, onLoadMoreResults} = this.props
    if (isAddressIncluded) {
      onLoadMoreResults(this.constructAddress())
    } else {
      onLoadMoreResults()
    }
  }

  onSelect(item) {
    this.props.onClear()
    this.props.onChange('')
    this.props.onSelect(item)
    this.hideMenu()
  }

  onButtonSelect(item) {
    if (item.createNewPerson) {
      this.onSelect({id: null})
    } else if (item.suggestionHeader) {
      return
    } else {
      this.loadMoreResults()
    }
  }

  onItemSelect(_value, item) {
    const {isSelectable, staffId, startTime} = this.props

    if (!item.legacyDescriptor) {
      this.onButtonSelect(item)
      return
    } else if (!isSelectable(item)) {
      alert('You are not authorized to add this person.') // eslint-disable-line no-alert
      return
    }

    logEvent('searchResultClick', {
      searchIndex: this.props.results.indexOf(item),
      staffId,
      startTime: moment(startTime).valueOf(),
    })
    this.onSelect(item)
  }

  onFocus() {
    if (this.isSearchable(this.props.searchTerm) || this.props.searchAddress) {
      this.setState({menuVisible: true})
    } else {
      this.hideMenu()
    }
  }

  renderMenu(items, _searchTerm, _style) {
    return (<div className='autocomplete-menu'>{items}</div>)
  }

  renderEachItem(item, id, isHighlighted) {
    const {total, results, searchTerm} = this.props
    const key = `${item.posInSet}-of-${item.setSize}`
    if (item.suggestionHeader) {
      return (
        <div id={id} key={key} aria-live='polite'>
          <SuggestionHeader
            currentNumberOfResults={results.length}
            total={total}
            searchTerm={searchTerm}
          />
        </div>
      )
    }
    return (
      <div id={id} key={key} className={itemClassName(isHighlighted)}>
        <PersonSuggestion {...item} />
      </div>)
  }

  renderItem(item, isHighlighted, _styles) {
    const {canCreateNewPerson, results, total} = this.props
    const canLoadMoreResults = results && total > results.length
    const buttonClassName = canLoadMoreResults && canCreateNewPerson ? ' col-md-6' : ''
    const className = itemClassName(isHighlighted) + buttonClassName
    const key = `${item.posInSet}-of-${item.setSize}`
    const id = `search-result-${key}`
    if (isHighlighted && this.inputRef) {
      this.inputRef.setAttribute('aria-activedescendant', id)
    }
    if (item.showMoreResults) {
      return (<div id={id} key={key} className={className}>
        {<ShowMoreResults />}
      </div>)
    }
    if (item.createNewPerson) {
      return (<div id={id} key={key} className={className}>
        {<CreateUnknownPerson />}
      </div>)
    }
    return this.renderEachItem(item, id, isHighlighted)
  }

  onChangeInput(_, value) {
    const {onSearch, onChange, isAddressIncluded} = this.props
    if (this.isSearchable(value) && !isAddressIncluded) {
      onSearch(value)
      this.setState({menuVisible: true})
    } else {
      this.hideMenu()
    }
    onChange(value)
  }

  renderInput(props) {
    const newProps = {...props, ref: (el) => {
      this.inputRef = el
      props.ref(el)
    }}
    return <input {...newProps}/>
  }

  renderAutocomplete() {
    const {searchTerm, id, results, canCreateNewPerson, total} = this.props
    const showMoreResults = {showMoreResults: 'Show More Results', posInSet: 'show-more', setSize: 'the-same'}
    const createNewPerson = {createNewPerson: 'Create New Person', posInSet: 'create-new', setSize: 'the-same'}
    const suggestionHeader = [{suggestionHeader: 'suggestion Header'}]
    const canLoadMoreResults = results && total > results.length
    addPosAndSetAttr(results) // Sequentually numbering items
    const newResults = suggestionHeader.concat(results.concat(canLoadMoreResults ? showMoreResults : [], canCreateNewPerson ? createNewPerson : []))

    return (
      <Autocomplete
        ref={(el) => (this.element_ref = el)}
        getItemValue={(_) => searchTerm}
        inputProps={{id, onBlur: this.hideMenu, onFocus: this.onFocus}}
        items={newResults}
        onChange={this.onChangeInput}
        onSelect={this.onItemSelect}
        renderItem={this.renderItem}
        open={this.state.menuVisible}
        renderMenu={this.renderMenu}
        value={searchTerm}
        wrapperStyle={{display: 'block'}}
        renderInput={(props) => this.renderInput(props)}
      />
    )
  }

  renderAddressSearch() {
    const {
      isAddressIncluded, location, searchAddress, searchCity, searchCounty, searchTerm,
      onChangeAddress, onChangeCity, onChangeCounty} = this.props

    return (
      <SearchByAddress
        isAddressIncluded={isAddressIncluded}
        location={location}
        toggleAddressSearch={this.handleToggleAddressSearch}
        onSubmit={this.handleSubmit}
        searchAddress={searchAddress}
        searchCity={searchCity}
        searchCounty={searchCounty}
        searchTerm={searchTerm}
        onChangeAddress={onChangeAddress}
        onChangeCity={onChangeCity}
        onChangeCounty={onChangeCounty}
      />
    )
  }

  render() {
    return (<div>{this.renderAutocomplete()}{this.renderAddressSearch()}</div>)
  }
}

Autocompleter.propTypes = {
  canCreateNewPerson: PropTypes.bool,
  id: PropTypes.string,
  isAddressIncluded: PropTypes.bool,
  isSelectable: PropTypes.func,
  location: PropTypes.shape({pathname: PropTypes.string}),
  onChange: PropTypes.func.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
  onChangeCity: PropTypes.func.isRequired,
  onChangeCounty: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onLoadMoreResults: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onToggleAddressSearch: PropTypes.func,
  results: PropTypes.array,
  searchAddress: PropTypes.string,
  searchCity: PropTypes.string,
  searchCounty: PropTypes.string,
  searchTerm: PropTypes.string,
  staffId: PropTypes.string,
  startTime: PropTypes.string,
  total: PropTypes.number,
}

Autocompleter.defaultProps = {
  isSelectable: () => true,
}

Autocompleter.displayName = 'Autocompleter'
