import React from 'react'
import PropTypes from 'prop-types'
import CountiesInjector from 'common/county/CountiesInjector'
import CountySelect from 'common/county/CountySelect'

class CountyNameSelect extends React.PureComponent {
  onChange({value}) {
    this.props.onChange(value)
  }

  render() {
    return (
      <CountiesInjector>
        <CountySelect
          {...this.props}
          onChange={this.onChange.bind(this)}
        />
      </CountiesInjector>
    )
  }
}

CountyNameSelect.propTypes = {
  gridClassName: PropTypes.string,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}
export default CountyNameSelect
