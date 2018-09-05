import PropTypes from 'prop-types'
import React from 'react'
import {NavLinks, NavLink} from 'react-wood-duck'
import nameFormatter from 'utils/nameFormatter'

const SideBarPeople = ({participants}) => (
  <NavLink key={1} text='People & Roles' href='#search-card-anchor'>
    <NavLinks nested={true} >
      <div className='nested-block'>
        {participants.map(({id, first_name, last_name, name_suffix}) =>
          <NavLink
            key={id}
            text={nameFormatter({first_name, last_name, name_suffix})}
            href={`#participants-card-${id}-anchor`}
            preIcon='fa fa-user'
          />
        )}
      </div>
    </NavLinks>
  </NavLink>
)

SideBarPeople.propTypes = {
  participants: PropTypes.array.isRequired,
}

export default SideBarPeople
