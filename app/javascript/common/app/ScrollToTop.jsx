import PropTypes from 'prop-types'
import React, {PureComponent} from 'react'

export class ScrollToTop extends PureComponent {
  constructor(props) {
    super(props)
    this.focusTarget = React.createRef()
  }
  componentDidUpdate(prevProps) {
    const location = this.props.location
    const hasNoHash = location && !location.hash
    if (location !== prevProps.location && hasNoHash) {
      window.scrollTo(0, 0)
      this.focusTarget.current.focus()
    }
  }

  render() {
    return (
      <div id='scroll-to-top' ref={this.focusTarget} tabIndex='-1'>
        {this.props.children}
      </div>)
  }
}

ScrollToTop.propTypes = {
  children: PropTypes.node.isRequired,
  // A location from react-router:
  location: PropTypes.shape({
    hash: PropTypes.string,
  }),
}
