import PropTypes from 'prop-types'
import React from 'react'

const TextAreaCount = ({value, onChange, id, maxLength}) => (
  <div>
    <textarea
      id={id}
      maxLength={maxLength}
      onChange={onChange}
      value={value}
    />
    <span className='text-area-count'>{value && `${value.length} / ${maxLength}`}</span>
  </div>

)
TextAreaCount.propTypes = {

  id: PropTypes.string,
  maxLength: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
}
export default TextAreaCount