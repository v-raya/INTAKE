import React from 'react'
import {SideBar, NavLinks, NavLink} from 'react-wood-duck'
import PropTypes from 'prop-types'
import SideBarPeople from 'views/SideBarPeople'

const SnapshotSideBar = (props) => {
  const klass = props.error ? 'side-bar-error' : 'side-bar-no-error'
  return (
    <div className='col-md-3 col-xs-4 hide-mobile hidden-print side-bar-container'>
      <h2 className='hidden'>Navigation</h2>
      <div className={klass}>
        <SideBar>
          <NavLinks>
            <SideBarPeople participants={props.participants} />
            <NavLink text='Relationships' href='#relationships-card-anchor' />
            <NavLink text='History' href='#history-card-anchor' />
          </NavLinks>
        </SideBar>
      </div>
    </div>
  )
}

SnapshotSideBar.propTypes = {
  error: PropTypes.bool,
  participants: PropTypes.array.isRequired,
}

SnapshotSideBar.defaultProps = {
  participants: [],
}

export default SnapshotSideBar
