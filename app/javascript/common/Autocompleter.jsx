import PersonSuggestion from 'common/PersonSuggestion'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import Autocomplete from 'react-autocomplete'
import SuggestionHeader from 'common/SuggestionHeader'
import CreateUnknownPerson from 'screenings/CreateUnknownPerson'
import ShowMoreResults from 'common/ShowMoreResults'
import {logEvent} from 'utils/analytics'

const menuStyle = {
  backgroundColor: '#fff',
  border: '1px solid #d4d4d4',
  borderBottomLeftRadius: '4px',
  borderBottomRightRadius: '4px',
  display: 'block',
  fontFamily: 'Helvetica, sans-serif',
  fontSize: '16px',
  fontWeight: 300,
  maxHeight: '32em',
  overflowX: 'hidden',
  overflowY: 'scroll',
  position: 'absolute',
  width: '100%',
  zIndex: 2,
}
const resultStyle = {
  borderBottom: '2px solid #d4d4d4',
  cursor: 'pointer',
  padding: '10px 20px',
}
const resultStyleHighlighted = {
  ...resultStyle,
  backgroundColor: '#d4d4d4',
}
const MIN_SEARCHABLE_CHARS = 2

const perosnSuggestion = (item) =>
  <PersonSuggestion
    address={item.address}
    dateOfBirth={item.dateOfBirth}
    isDeceased={item.isDeceased}
    ethnicity={item.ethnicity}
    fullName={item.fullName}
    gender={item.gender}
    isSealed={item.isSealed}
    isSensitive={item.isSensitive}
    languages={item.languages}
    legacyDescriptor={item.legacyDescriptor}
    phoneNumber={item.phoneNumber}
    races={item.races}
    ssn={item.ssn}
  />

const showMoreResults = () =>
  <div className='row half-pad-top half-pad-bottom half-pad-right half-pad-left'>
    {
      <div>
        <ShowMoreResults />
      </div>
    }
  </div>

const addPosAndSetAttr = (results) => {
  const one = 1
  for (var len = results.length, i = 0; i < len; ++i) {
    results[i].posInSet = i + one
    results[i].setSize = len
  }
}

export class Autocompleter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menuVisible: false,
    }
    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.onItemSelect = this.onItemSelect.bind(this)
    this.renderMenu = this.renderMenu.bind(this)
    this.onChangeInput = this.onChangeInput.bind(this)
    this.renderItem = this.renderItem.bind(this)
  }

  isSearchable(value) {
    return value && value.replace(/^\s+/, '').length >= MIN_SEARCHABLE_CHARS
  }

  onItemSelect(_value, item) {
    const {isSelectable, onClear, onChange, onSelect, onLoadMoreResults} = this.props
    if (item.legacyDescriptor) {
      if (isSelectable(item)) {
        logEvent('searchResultClick', {
          searchIndex: this.props.results.indexOf(item),
        })
        onClear()
        onChange('')
        onSelect(item)
        this.setState({menuVisible: false})
        return
      }
      alert('You are not authorized to add this person.') // eslint-disable-line no-alert
    }
    if (item.createNewPerson) {
      onClear()
      onChange('')
      onSelect({id: null})
      this.setState({menuVisible: false})
    } else {
      onLoadMoreResults()
    }
  }

  onFocus() {
    if (this.isSearchable(this.props.searchTerm)) {
      this.setState({menuVisible: true})
    } else {
      this.setState({menuVisible: false})
    }
  }

  onBlur() {
    this.setState({menuVisible: false})
  }

  renderMenu(items, searchTerm, _style) {
    const {total, results} = this.props
    const resultsLength = results.length
    return (
      <div style={menuStyle} className='autocomplete-menu'>
        <SuggestionHeader
          currentNumberOfResults={resultsLength}
          total={total}
          searchTerm={searchTerm}
        />
        {items}
      </div>
    )
  }

  renderItem(item, isHighlighted, _styles) {
    const style = isHighlighted ? resultStyleHighlighted : resultStyle
    const key = `${item.posInSet}-of-${item.setSize}`
    const id = `search-result-${key}`
    if (isHighlighted && this.inputRef) {
      this.inputRef.setAttribute('aria-activedescendant', id)
    }
    if (item.showMoreResults) {
      return (<div id={id} key={key} style={style}>
        {showMoreResults()}
      </div>)
    } else if (item.createNewPerson) {
      return (<div id={id} key={key} style={style}>
        <div className='row half-pad-top half-pad-bottom half-pad-right half-pad-left'>
          {<div>
            <CreateUnknownPerson />
          </div>}
        </div>
      </div>)
    }
    return (<div id={id} key={key} style={style}>
      {perosnSuggestion(item)}
    </div>)
  }

  onChangeInput(_, value) {
    const {onSearch, onChange} = this.props
    if (this.isSearchable(value)) {
      onSearch(value)
      this.setState({menuVisible: true})
    } else {
      this.setState({menuVisible: false})
    }
    onChange(value)
  }

  renderInput(props) {
    const newProps = {
      ...props,
      ref: (el) => {
        this.inputRef = el
        props.ref(el)
      },
    }
    return <input {...newProps}/>
  }

  render() {
    const {searchTerm, id, results, canCreateNewPerson, total} = this.props
    const showMoreResults = {showMoreResults: 'Show More Results', posInSet: 'show-more', setSize: 'the-same'}
    const createNewPerson = {createNewPerson: 'Create New Person', posInSet: 'create-new', setSize: 'the-same'}
    const canLoadMoreResults = results && total !== results.length
    const {menuVisible} = this.state
    //Sequentually numbering items
    addPosAndSetAttr(results)
    const newResults = results.concat(canLoadMoreResults ? showMoreResults : [], canCreateNewPerson ? createNewPerson : [])
    return (
      <Autocomplete
        ref={(el) => (this.element_ref = el)}
        getItemValue={(_) => searchTerm}
        inputProps={{id, onBlur: this.onBlur, onFocus: this.onFocus}}
        items={newResults}
        onChange={this.onChangeInput}
        onSelect={this.onItemSelect}
        renderItem={this.renderItem}
        open={menuVisible}
        renderMenu={this.renderMenu}
        value={searchTerm}
        wrapperStyle={{display: 'block', position: 'relative'}}
        renderInput={(props) => this.renderInput(props)}
      />
    )
  }
}

Autocompleter.propTypes = {
  canCreateNewPerson: PropTypes.bool,
  id: PropTypes.string,
  isSelectable: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onLoadMoreResults: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  results: PropTypes.array,
  searchTerm: PropTypes.string,
  total: PropTypes.number,
}

Autocompleter.defaultProps = {
  isSelectable: () => true,
}

Autocompleter.displayName = 'Autocompleter'

export default Autocompleter
