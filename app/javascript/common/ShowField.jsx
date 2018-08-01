import ClassNames from 'classnames'
import ErrorMessages from 'common/ErrorMessages'
import PropTypes from 'prop-types'
import React from 'react'

const ShowField = ({children, errors, gridClassName, textWrapClassName, labelClassName, htmlFor, label, required, value}) => {
  const emptyArrayLength = 0
  const hasErrors = errors && errors.length > emptyArrayLength
  const gridClassNames = ClassNames(gridClassName, {'input-error': hasErrors})
  const textWrapClassNames = ClassNames(textWrapClassName)
  const labelClassNames =
    ClassNames(labelClassName, {'input-error-label': hasErrors}, 'show-label', {required: required})

  return (
    <div className={gridClassNames}>
      <div className={labelClassNames}>
        {label}
      </div>
      <div className={textWrapClassNames}>
        {value}
      </div>
      <ErrorMessages ariaDescribedBy={htmlFor} errors={errors}/>
      <span>{children || '\u00A0'}</span>
    </div>
  )
}

ShowField.propTypes = {
  children: PropTypes.any,
  errors: PropTypes.array,
  gridClassName: PropTypes.string,
  htmlFor: PropTypes.string,
  label: PropTypes.string.isRequired,
  labelClassName: PropTypes.string,
  required: PropTypes.bool,
  textWrapClassName: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
}
export default ShowField
