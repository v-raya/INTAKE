import React, {Component} from 'react'
import PropTypes from 'prop-types'
import CreateUnknownPerson from 'screenings/CreateUnknownPerson'

export class AutocompleterCreateNewPersonFooter extends Component {
  render() {
    const {canCreateNewPerson, onCreateNewPerson} = this.props
    return (
      <div className='row half-pad-top half-pad-bottom half-pad-right half-pad-left'>
        {
          canCreateNewPerson &&
            <div>
              <CreateUnknownPerson onClick={onCreateNewPerson} />
            </div>
        }
      </div>
    )
  }
}

AutocompleterCreateNewPersonFooter.propTypes = {
  canCreateNewPerson: PropTypes.bool,
  onCreateNewPerson: PropTypes.func,
}

export default AutocompleterCreateNewPersonFooter
