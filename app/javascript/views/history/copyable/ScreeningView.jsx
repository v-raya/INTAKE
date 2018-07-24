import React from 'react'
import PropTypes from 'prop-types'

const CopyableScreeningView = ({
  county,
  dateRange,
  index,
  people,
  status,
  worker,
}) => (
  <tr>
    <td><span>{index ? `${index}.` : ''}</span></td>
    <td>{dateRange}</td>
    <td>
      <div className='semibold'>Screening</div>
      <div>({status})</div>
    </td>
    <td>{county}</td>
    <td>
      <div className='people'>{people}</div>
      <div className='worker'><span>Worker:</span> {worker}</div>
    </td>
  </tr>
)

CopyableScreeningView.propTypes = {
  county: PropTypes.string,
  dateRange: PropTypes.string,
  index: PropTypes.number,
  people: PropTypes.string,
  status: PropTypes.string,
  worker: PropTypes.string,
}

export default CopyableScreeningView
