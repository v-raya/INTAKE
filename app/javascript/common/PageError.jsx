import PropTypes from 'prop-types'
import React from 'react'
import Affix from 'react-overlays/lib/AutoAffix'

const PageError = ({pageErrorMessage}) => (
  <Affix>
    <div className='page-error'>
      <div className='container'>
        <div className='row'>
          <p className='text-center'>
            {pageErrorMessage || 'Something went wrong, sorry! Please try your last action again.'}
          </p>
        </div>
      </div>
    </div>
  </Affix>

)

PageError.propTypes = {
  pageErrorMessage: PropTypes.string,
}

export default PageError
