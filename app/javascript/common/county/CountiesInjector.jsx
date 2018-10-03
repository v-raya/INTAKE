import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {selectCountiesWithoutStateOfCalifornia} from 'selectors/systemCodeSelectors'

const mapStateToProps = (state, ownProps) => ({
  counties: selectCountiesWithoutStateOfCalifornia(state).toJS(),
  ...ownProps,
})

class CountiesInjector extends React.PureComponent {
  render() {
    return React.cloneElement(this.props.children, {
      counties: this.props.counties,
    })
  }
}

CountiesInjector.propTypes = {
  children: PropTypes.element.isRequired,
  counties: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    value: PropTypes.string,
  })),
}

export default connect(mapStateToProps)(CountiesInjector)
