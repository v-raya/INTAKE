import React from 'react'
import PropTypes from 'prop-types'
import Autocompleter from 'common/search/Autocompleter'
import {withRouter} from 'react-router'
import {isSearchByAddressOn} from 'common/config'

class PersonSearchForm extends React.Component {
  componentWillUnmount() {
    this.props.onClear()
    this.props.onChange('')
    this.props.onResetAddressSearch()
  }

  render() {
    const {
      isAddressIncluded,
      searchPrompt,
      ...autocompleterProps
    } = this.props

    const classNameAddressSearchDisabled = isSearchByAddressOn(this.props.location) ?
      '' : 'address-search-disabled'

    return (
      <div>
        <button className='anchor' aria-label='search-card-anchor' id='search-card-anchor'/>
        <div className='card double-gap-bottom hidden-print' id='search-card'>
          <div className='card-header'>
            <h2>Search</h2>
          </div>
          <div className={`card-body ${classNameAddressSearchDisabled}`}>
            <div className='row'>
              <div className='col-md-12'>
                <label className='pull-left' htmlFor='screening_participants'>{searchPrompt}</label>
                <Autocompleter id='screening_participants' {...autocompleterProps} isAddressIncluded={isAddressIncluded} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

PersonSearchForm.propTypes = {
  canCreateNewPerson: PropTypes.bool.isRequired,
  isAddressIncluded: PropTypes.bool,
  isSelectable: PropTypes.func,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  onChange: PropTypes.func.isRequired,
  onChangeCounty: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onLoadMoreResults: PropTypes.func,
  onResetAddressSearch: PropTypes.func,
  onSearch: PropTypes.func,
  onSelect: PropTypes.func,
  results: PropTypes.array,
  searchCounty: PropTypes.string,
  searchPrompt: PropTypes.string.isRequired,
  searchTerm: PropTypes.string,
  staffId: PropTypes.string,
  total: PropTypes.number,
}

export {PersonSearchForm}

const PersonSearchFormWithRouter = withRouter(PersonSearchForm)
PersonSearchFormWithRouter.displayName = 'PersonSearchForm'
export default PersonSearchFormWithRouter
