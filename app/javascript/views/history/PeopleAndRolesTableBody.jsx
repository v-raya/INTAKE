import React from 'react'
import PropTypes from 'prop-types'

const PeopleAndRolesTableBody = ({peopleAndRoles}) => (
  peopleAndRoles.map(({victim, perpetrator, allegations, disposition}, index) => (
    <tr key={index}>
      <td className='victim'>{victim}</td>
      <td className='perpetrator'>{perpetrator}</td>
      <td className='allegations disposition'>{allegations} {disposition}</td>
    </tr>
  ))
)

PeopleAndRolesTableBody.propTypes = {
  peopleAndRoles: PropTypes.arrayOf(PropTypes.shape({
    allegations: PropTypes.string,
    disposition: PropTypes.string,
    perpetrator: PropTypes.string,
    victim: PropTypes.string,
  })),
}

export default PeopleAndRolesTableBody
