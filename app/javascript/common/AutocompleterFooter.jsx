import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ShowMoreResults from 'common/ShowMoreResults'

export class AutocompleterFooter extends Component {
  render() {
    const {canLoadMoreResults, onLoadMoreResults} = this.props
    return (
      <div className='row half-pad-top half-pad-bottom half-pad-right half-pad-left'>
        {
          canLoadMoreResults &&
            <div>
              <ShowMoreResults onClick={onLoadMoreResults} />
            </div>
        }
      </div>
    )
  }
}

AutocompleterFooter.propTypes = {
  canLoadMoreResults: PropTypes.bool,
  onLoadMoreResults: PropTypes.func,
}

export default AutocompleterFooter
