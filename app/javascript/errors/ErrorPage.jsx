import PropTypes from 'prop-types'
import React from 'react'
import {Link} from 'react-router'

const ErrorPage = ({message, details}) => (
  <div className='error-panel centered'>
    <h4>
      <i className='fa fa-warning c-red gap-right'/>
      {message}
    </h4>
    <div className='gap-top'>
      <span>{details}</span>
      <br/>
      <Link to='/'>Return to your dashboard</Link>
      <span>.</span>
    </div>
  </div>
)

ErrorPage.propTypes = {
  details: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
}

export default ErrorPage
